import React from 'react';
import Image from 'next/image';
import bgImage from '../../public/images/stonesBackground.png';

export default function Login(props) {
	return (
		<>
			{/* <Image
				src={bgImage}
				alt="Background image of castle and scenery"
				layout="fill"
				className={backgroundImage}
				priority
			/> */}
			<div className="background">
				<div className="loginFormContainer">
					<form className="loginForm">
						<div className="loginFormContent">
							<h3 className="loginFormTitle">Sign In</h3>
							<div className="form-group mt-3">
								<label>Email address</label>
								<input
									type="email"
									className="form-control mt-1"
									placeholder="Enter email"
								/>
							</div>
							<div className="form-group mt-3">
								<label>Password</label>
								<input
									type="password"
									className="form-control mt-1"
									placeholder="Enter password"
								/>
							</div>
							<div className="d-grid gap-2 mt-3">
								<button type="submit" className="btn btn-primary">
									Submit
								</button>
							</div>
							<p className="forgot-password text-right mt-2">
								Forgot <a href="#">password?</a>
							</p>
						</div>
					</form>
				</div>
			</div>

		</>
		
	);
};