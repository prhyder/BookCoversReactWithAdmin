import React from 'react';

const Spinner = () => {
	const spinnerStyle = {
		width: "1.5rem",
		height: "1.5rem"
	};

	return (
		<div className="spinner-border ms-2 spinner-border-sm" style={ spinnerStyle } role="status">
			<span className="visually-hidden">Loading...</span>
		</div>
	);
}

const ButtonWithLoadingIndicator = (props) => {
	const { text, showLoadingIndicator, ...rest } = props;

	return (
		<button type="button" className="btn btn-primary align-middle " {...rest}>
			<span className="d-flex">
			{text}
			{ showLoadingIndicator && <Spinner />}
			</span>
			
		</button>
	);
}

export default ButtonWithLoadingIndicator;