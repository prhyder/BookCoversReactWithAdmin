import React from 'react';

const BackButtonLink = (props) => {
	const { text, onClick } = props;

	const linkStyle = {
		textAlign: "center",
		lineHeight: "24px",
		verticalAlign: "middle",
		display: "inline-block",
		marginBottom: "24px",
		cursor: "pointer",
	}

	const arrowStyle = {
		marginTop: "2px",
		marginRight: "4px",
	}

	return (
		<a style={linkStyle} className="link-hover" onClick={onClick}>
			<i className="bi bi-arrow-left" style={arrowStyle}></i>
			{text}
		</a>
	)
}

export default BackButtonLink;