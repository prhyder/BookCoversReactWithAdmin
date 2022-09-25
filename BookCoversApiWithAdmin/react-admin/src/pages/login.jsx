import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { userService } from '../services/user.service';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function Login() {
	const router = useRouter();
	const [error, setError] = useState('');

	useEffect(() => {
		// Redirect to home if already logged in
		if (userService.userValue) {
			router.push('/');
		}
	}, []);


	return (
		<div className="background">
			<div className="background-gradient">
				<div className="loginFormContainer">
					<Formik
						initialValues={{
							"username": '',
							"password": '',
							"id": '',
							"firstName": '',
							"lastName": ''
						}}

						validationSchema={Yup.object().shape({
							username: Yup.string()
								.required('Username is required'),
							password: Yup.string()
								.min(6, 'Password must be at least 6 characters')
								.required('Password is required'),
						})}
						onSubmit={ async ({ username, password }) => {
							return userService.login(username, password)
								.then(() => {
									// Get return url from query parameters or default to '/'
									const returnUrl = router.query.returnUrl || '/';
									router.push(returnUrl);
								})
								.catch(async (error) => {
									setError(error);
								});
						}}
					>
						{(props) => (
							<Form className="loginForm">
								<div className="loginFormContent">
									<h3 className="loginFormTitle">Login</h3>
									<div className="form-group mt-3">
										<label htmlFor="username">Username</label>
										<Field name="username" type="text" className={'form-control' + (props.errors.username && props.touched.username ? ' is-invalid' : '')} />
										<ErrorMessage name="username" component="div" className="invalid-feedback" />
									</div>
									<div className="form-group mt-3">
										<label htmlFor="password">Password</label>
										<Field name="password" type="password" className={'form-control' + (props.errors.password && props.touched.password ? ' is-invalid' : '')} />
										<ErrorMessage name="password" component="div" className="invalid-feedback" />
									</div>
									<div className="form-group d-grid mt-3">
										<button type="submit" className="btn btn-primary mr-2">Log In</button>
									</div>
									<p className="forgot-password text-right mt-2">
										Forgot <a href="#">password?</a>
									</p>
									<div className="error-text">{ error }</div>
								</div>
							</Form>
						)}
					</Formik>
				</div>

			</div>

		</div>
	);
};