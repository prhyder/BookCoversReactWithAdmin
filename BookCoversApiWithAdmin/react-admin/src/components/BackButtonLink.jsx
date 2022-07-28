import React from 'react';
import Link from 'next/link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const BackButtonLink = (props) => {
	const { text, url } = props;

	const linkStyle = {
		textAlign: "center",
		lineHeight: "24px",
		verticalAlign: "middle",
	}

	const arrowStyle = {
		marginTop: "2px",
		marginBottom: "-2px",
	}

	return (
		<Link href={url} value="{text}" >
			<a style={linkStyle}>
				<ArrowBackIcon
					fontSize="medium"
					style={arrowStyle}
					sx={{ paddingTop: 1 }}
				/> {text}
			</a>
		</Link>
	)
}

export default BackButtonLink;