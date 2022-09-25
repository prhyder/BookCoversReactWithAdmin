import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ButtonWithLoadingIndicator from '../ButtonWithLoadingIndicator';
import BackButtonLink from '../BackButtonLink';
import Image from 'next/image';
import ConfirmModal from '../ConfirmModal';
import { useFormik } from 'formik';
import getConfig from 'next/config';
import * as yup from 'yup';
import imagePaths from '../../imagePaths.json';

import { fetchWrapper } from '../../helpers/fetch-wrapper';

const { publicRuntimeConfig } = getConfig();
const API_URL = `${publicRuntimeConfig.apiUrl}/bookCovers/`;
console.log(`api_url: ${API_URL}`);

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
			const data = await fetchWrapper.get(`${API_URL}/${bookCoverId}`);
			setBookCover(data);
		}
		catch (err) {
			console.log(`Error: ${err}`);
		}
	}

	const getGenres = async () => {
		try {
			const data = await fetchWrapper.get(`${publicRuntimeConfig.apiUrl}/genres`);
			setGenres(data)
		}
		catch (err) {
			console.log(`Error: ${err}`)
		}
	}

	useEffect(() => {
		getImagePaths();
		getGenres();
		if (!isAddMode) {
			getBookCoverById();
		}
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
			.number()
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
			values.genreId = parseInt(values.genreId);

			if (isAddMode) {
				fetchWrapper.post(API_URL, values)
					.then(() => {
						router.push('/bookCovers');
					}).catch((error) => {
						console.log("Error: ", error);
						setErrorText("There was an error when trying to create the book cover.");
					});
			}
			else {
				fetchWrapper.put(API_URL, values)
					.then(() => {
						router.push('/bookCovers');
					}).catch((error) => {
						console.log("Error: ", error);
						setErrorText("There was an error when trying to update the book cover.");
					});
			}
		}
	});

	const handleCancel = () => {
		if (formik.dirty) {
			showConfirmModalButton.click();
		}
		else {
			router.push('/bookCovers');
		}
	}

	const handleClickYes = () => {
		router.push('/bookCovers');
	}

	const imageStyle = {
		marginBottom: "25px"
	}

	return (
		<div className="pageRoot">
			<BackButtonLink text='Back to Book Covers' onClick={handleCancel} />

			<h1>{isAddMode ? 'Add Book Cover' : 'Edit Book Cover'}</h1>
			<form className="g-3 mt-4 form-outline" onSubmit={formik.handleSubmit}>
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
				
				<div className="mb-3">
					<label htmlFor="name" className="form-label">
						Image URL
					</label>
					<select
						id="imageUrl"
						className="form-select"
						name="imageUrl"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.imageUrl}
						>
						{imagePathsList.map((image, index) => (
							<option key={index} value={`/images/${image}`}>
								{image}
							</option>
						))}

					</select>
					<div className="error-text">{formik.touched.imageUrl && formik.errors.imageUrl}</div>
					<div className="error-text">{formik.touched.imageUrl && Boolean(formik.errors.imageUrl)}</div>

					
				</div>
				<div className="mb-3">
					<label htmlFor="title" className="form-label">
						Book Title
					</label>
					<input
						id="title"
						name="title"
						className="form-control"
						type="text"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.title}
					/>
					<div className="error-text">{formik.touched.title && formik.errors.title}</div>
					<div className="error-text">{formik.touched.title && Boolean(formik.errors.title)}</div>
				</div>
				<div className="mb-3">
					<label htmlFor="name" className="form-label">
						Author Name
					</label>
					<input
						id="authorName"
						name="authorName"
						className="form-control"
						type="text"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.authorName}
					/>
					<div className="error-text">{formik.touched.authorName && formik.errors.authorName}</div>
					<div className="error-text">{formik.touched.authorName && Boolean(formik.errors.authorName)}</div>
				</div>
				<div className="mb-3">
					<label htmlFor="name" className="form-label">
						Genre
					</label>
					<select
						id="genreId"
						className="form-select"
						name="genreId"
						type="number"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.genreId}
					>
						{genres.map((genre) => (
							<option key={genre.genreId} value={parseInt(genre.genreId)}>
								{genre.name}
							</option>
						))}

					</select>
					<div className="error-text">{formik.touched.genreId && formik.errors.genreId}</div>
					<div className="error-text">{formik.touched.genreId && Boolean(formik.errors.genreId)}</div>
				</div>
				
				<div className="mb-3">
					<button type="button" className="btn btn-secondary d-inline mt-2 me-2" onClick={handleCancel} >
						Cancel
					</button>
					<ButtonWithLoadingIndicator
						type="submit"
						className="btn btn-primary d-inline mt-2 me-2"
						text={"Submit"}
						showLoadingIndicator={formSubmitted}
					/>
				</div>

				<p className='error-text'>{errorText}</p>
				
			</form>

			<ConfirmModal text="Are you sure you want to discard your changes?" onClickYes={handleClickYes} />

		</div>
	)
}

export default AddEditBookCover;