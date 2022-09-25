import React, { useState, useEffect } from 'react';
import { useRouter, query } from 'next/router';
import ButtonWithLoadingIndicator from '../ButtonWithLoadingIndicator';
import BackButtonLink from '../BackButtonLink';
import ConfirmModal from '../ConfirmModal';
import { useFormik } from 'formik';
import getConfig from 'next/config';
import * as yup from 'yup';

import { fetchWrapper } from '../../helpers/fetch-wrapper';

const { publicRuntimeConfig } = getConfig();
const API_URL = `${publicRuntimeConfig.apiUrl}/genres/`;

const AddEditGenre = (props) => {
	const router = useRouter();
	const genreId = props.id;
	const isAddMode = !genreId;

	const [errorText, setErrorText] = useState('');
	const [genre, setGenre] = useState([]);
	const [formSubmitted, setFormSubmitted] = useState(false);

	const getGenreById = async () => {
		try {
			const data = await fetchWrapper.get(`${API_URL}/${genreId}`);
			setGenre(data);
		}
		catch (err) {
			console.log(`Error: ${err}`)
		}
	}

	useEffect(() => {
		if (!isAddMode) {
			getGenreById();
		}
	}, []);

	const validationSchema = yup.object({
		name: yup
			.string('Enter a name')
			.required('Name is required'),
	});

	const formik = useFormik({
		initialValues: {
			name: genre.name || '',
			genreId: genre.genreId
		},
		enableReinitialize: true,
		validationSchema: validationSchema,
		onSubmit: values => {
			setFormSubmitted(true);

			if (isAddMode) {
				fetchWrapper.post(API_URL, values)
					.then(() => {
						router.push('/genres');
					})
					.catch((error) => {
						console.log("Error: ", error);
						setErrorText("There was an error when trying to create the genre.");
					});
			}
			else {
				fetchWrapper.put(API_URL, values)
					.then(() => {
						router.push('/genres');
					})
					.catch((error) => {
						console.log("Error: ", error);
						setErrorText("There was an error when trying to update the genre.");
					});
			}
		}
	});

	const handleCancel = () => {
		if (formik.dirty) {
			showConfirmModalButton.click();
		}
		else {
			router.push('/genres');
		}
	}

	const handleClickYes = () => {
		router.push('/genres');
	}

	return (
		<div className='pageRoot'>
			<BackButtonLink text='Back to Genres' onClick={handleCancel} />

			<h1>{isAddMode ? 'Add Genre' : 'Edit Genre'}</h1>
			<form className="g-3 mt-4 form-outline" onSubmit={formik.handleSubmit}>
				<div className="mb-3">
					<label htmlFor="name" className="form-label">
						Genre Name
					</label>
					<input
						id="name"
						type="text"
						className="form-control"
						name="name"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.name}
					/>
					<div className="error-text">{formik.touched.name && formik.errors.name}</div>
					<div className="error-text">{formik.touched.name && Boolean(formik.errors.name)}</div>
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

export default AddEditGenre;