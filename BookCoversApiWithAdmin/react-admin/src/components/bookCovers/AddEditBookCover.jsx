import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { TextField, FormGroup } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ButtonWithLoadingIndicator from '../ButtonWithLoadingIndicator';
import BackButtonLink from '../BackButtonLink';
import Image from 'next/image';
import { useFormik } from 'formik';
import { apiUrl } from '../../../config.js';
import * as yup from 'yup';
import imagePaths from '../../imagePaths.json';

const API_URL = `${apiUrl}/bookCovers/`;

const AddEditBookCover = (props) => {
	const router = useRouter();
	const bookCoverId = props.id;
	const isAddMode = !bookCoverId;

	const [errorText, setErrorText] = useState('');
	const [bookCover, setBookCover] = useState([]);
	const [genres, setGenres] = useState([]);
	const [imagePathsList, setimagePathsList] = useState([]);
	const [formSubmitted, setFormSubmitted] = useState(false);

	const getImagePaths = async () => {
		setimagePathsList(Object.values(imagePaths));
	}

	const getBookCoverById = async () => {
		try {
			const url = API_URL + bookCoverId;
			const bookCoverResponse = await axios.get(url);
			setBookCover(bookCoverResponse.data);
		}
		catch (err) {
			console.log(`Error: ${err}`)
		}
	}

	const getGenres = async () => {
		try {
			const genreApi = `${apiUrl}/genres`;
			const genres = await axios.get(genreApi);
			setGenres(genres.data);
		}
		catch (err) {
			console.log(`Error: ${err}`)
		}
	}

	useEffect(() => {
		(async () => {
			getImagePaths();
			getGenres();
			if (!isAddMode) {
				getBookCoverById();
			}
		})();
	}, []);

	const validationSchema = yup.object({
		title: yup
			.string()
			.required('Title is required'),
		authorName: yup
			.string()
			.required('Author Name is required'),
		imageUrl: yup
			.string()
			.required('Image is required'),
		genreId: yup
			.string()
	});

	const formik = useFormik({
		initialValues: {
			bookCoverId: bookCover.bookCoverId,
			title: bookCover.title || '',
			authorName: bookCover.authorName || '',
			imageUrl: bookCover.imageUrl || '',
			genreId: bookCover.genreId || ''
		},
		enableReinitialize: true,
		validationSchema: validationSchema,
		onSubmit: values => {
			setFormSubmitted(true);

			if (isAddMode) {
				axios({
					method: 'post',
					url: API_URL,
					data: values,
					headers: {
						'Content-Type': 'application/json',
					},
				}).then(() => {
					router.push('/bookCovers');
				}).catch((error) => {
						console.log("Error: ", error);
						setErrorText("There was an error when trying to update the book cover.");
					});
			}
			else {
				values.bookCoverId = parseInt(bookCoverId);

				axios({
					method: 'put',
					url: API_URL,
					data: values,
					headers: {
						'Content-Type': 'application/json',
					},
				}).then(() => {
					router.push('/bookCovers');
				}).catch((error) => {
						console.log("Error: ", error);
						setErrorText("There was an error when trying to update the book cover.");
					});
			}
		}
	});

	const textBoxStyle = {
		width: "350px",
		marginBottom: "15px"
	}

	const imageStyle = {
		marginBottom: "25px"
	}

	const selectStyle = {
		height: "40px",
		width: "350px",
		marginBottom: "15px",
		paddingBottom: "3px"
	}

	const labelStyle = {
		marginBottom: "16px",
		paddingLeft: "3px",
		paddingRight: "3px",
		backgroundColor: "white",
		background: "white"
	}

	return (
		<>
			<BackButtonLink text='Back to Book Covers' url='/bookCovers' />

			<form onSubmit={formik.handleSubmit}>
				<FormGroup>
					<h1>{isAddMode ? 'Add Book Cover' : 'Edit Book Cover'}</h1>

					<div style={imageStyle}>
						{formik.values.imageUrl
							&& <Image
								src={formik.values.imageUrl}
								width={156}
								height={250}
								layout="fixed"
								priority
							/>}
					</div>
					
					<FormControl>
						<InputLabel id="image-select-label" style={labelStyle} shrink={true}>Image URL</InputLabel>
						<Select
								labelId="image-select-label"
							id="select-book-image"
								value={formik.values.imageUrl}
								style={selectStyle}
							name="imageUrl"
							defaultValue={formik.values.imageUrl}
							onChange={e => {
								const imageUrlValue = e.target.value;
								setBookCover({
									title: formik.values.title,
									authorName: formik.values.authorName,
									genreId: formik.values.genreId,
									imageUrl: imageUrlValue
								});
							}}>
							{imagePathsList && imagePathsList.map((option) => (
								<MenuItem key={option} value={`/images/${option}`}>
									<img
										id='selected-image'
										src={`/images/${option}`}
										width="100px"
										height="auto"
										sx={{ marginRight: 2 }}
									/>
									<ListItemText primary={option} />
								</MenuItem>
							))}
						</Select>
					</FormControl>
				
					<TextField
						size="small"
						variant="outlined"
						label="Title"
						id="title"
						name="title"
						type="title"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.title}
						error={formik.touched.title && Boolean(formik.errors.title)}
						helperText={formik.touched.title && formik.errors.title}
						InputLabelProps={{
							shrink: true,
						}}
						style={textBoxStyle}
					/>
					<TextField
						size="small"
						variant="outlined"
						label="Author Name"
						id="authorName"
						name="authorName"
						type="authorName"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.authorName}
						error={formik.touched.authorName && Boolean(formik.errors.authorName)}
						helperText={formik.touched.authorName && formik.errors.authorName}
						InputLabelProps={{
							shrink: true,
						}}
						style={textBoxStyle}
					/>


					<FormControl>
						<InputLabel id="genre-select-label" style={labelStyle} shrink={true}>Genre</InputLabel>
						<Select
							labelId="genre-select-label"
							size="small"
							id="select-genre"
							value={formik.values.genreId}
							height={25}
							style={selectStyle}
							name="genreId"
							defaultValue={formik.values.genreId}
							onChange={e => {
								const genreId = e.target.value;
								setBookCover({
									title: formik.values.title,
									authorName: formik.values.authorName,
									genreId: genreId,
									imageUrl: formik.values.imageUrl
								});
							}}>
							{genres.map((genre) => (
								<MenuItem key={genre.genreId} value={genre.genreId}>
									<ListItemText primary={genre.name} />
								</MenuItem>
							))}
						</Select>
					</FormControl>

				</FormGroup>
				<ButtonWithLoadingIndicator
					type="submit"
					sx={{ marginTop: 1 }}
					text={"Submit"}
					showLoadingIndicator={formSubmitted}
				/>

				<p className='error-text'>{errorText}</p>
			</form>

		</>
	)
}

export default AddEditBookCover;