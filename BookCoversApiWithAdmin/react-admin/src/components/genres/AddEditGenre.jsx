import React, { useState, useEffect } from 'react';
import { useRouter, query } from 'next/router';
import axios from 'axios';
import { TextField, FormGroup, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';
import ButtonWithLoadingIndicator from '../ButtonWithLoadingIndicator';
import BackButtonLink from '../BackButtonLink';
import { useFormik } from 'formik';
import { apiUrl } from '../../../config.js';
import * as yup from 'yup';

const API_URL = `${apiUrl}/genres/`;

const AddEditGenre = (props) => {
	const router = useRouter();
	const genreId = props.id;
	const isAddMode = !genreId;

	const [errorText, setErrorText] = useState('');
	const [genre, setGenre] = useState([]);
	const [formSubmitted, setFormSubmitted] = useState(false);

	const getGenreById = async () => {
		try {
			const url = API_URL + genreId;
			const genre = await axios.get(url);
			setGenre(genre.data);
		}
		catch (err) {
			console.log(`Error: ${err}`)
		}
	}

	useEffect(() => {
		if (!isAddMode) {
			(async () => {
				getGenreById();
			})();
		}
	}, []);

	const validationSchema = yup.object({
		name: yup
			.string('Enter a name')
			.required('Name is required'),

	});

	const formik = useFormik({
		initialValues: {
			name: genre.name || ''
		},
		enableReinitialize: true,
		validationSchema: validationSchema,
		onSubmit: values => {
			setFormSubmitted(true);

			if (isAddMode) {
				axios.post(API_URL, values)
					.then((response) => {
						router.push('/genres');
					})
					.catch((error) => {
						console.log("Error: ", error);
						setErrorText("There was an error when trying to create the genre.");
					});
			}
			else {
				const name = values.name;
				const genreToUpdate = { Name: name, GenreId: parseInt(genreId) };
				axios.put(API_URL, genreToUpdate)
					.then((response) => {
						router.push('/genres');
					})
					.catch((error) => {
						console.log("Error: ", error);
						setErrorText("There was an error when trying to update the genre.");
					});
			}
		}
	});

	const textBoxStyle = {
		width: "300px",
	}

	return (
		<>
			<BackButtonLink text='Back to Genres' url='/genres' />
			<form onSubmit={formik.handleSubmit}>
				<FormGroup>
					<h1>{isAddMode ? 'Add Genre' : 'Edit Genre'}</h1>
					<TextField
						size="small"
						variant="outlined"
						label="Name"
						id="name"
						name="name"
						type="name"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.name}
						error={formik.touched.name && Boolean(formik.errors.name)}
						helperText={formik.touched.name && formik.errors.name}
						InputLabelProps={{
							shrink: true,
						}}
						style={textBoxStyle}
					/>
				</FormGroup>

				<ButtonWithLoadingIndicator
					type="submit"
					sx={{ marginTop: 1 }}
					text={"Submit"}
					showLoadingIndicator={formSubmitted}
				/>
			</form>
			<p className='error-text'>{errorText}</p>
		</>
	)
}

export default AddEditGenre;