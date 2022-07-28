import React from 'react';
import { Button } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

const ButtonWithLoadingIndicator = (props) => {
	const { text, showLoadingIndicator, ...rest } = props;

	return (
		<Button
			variant="contained"
			color="secondary"
			{...rest}
		>
			{text}
			{ showLoadingIndicator && <CircularProgress size={20} sx={{marginLeft: 1}} /> }
		</Button>
	);
}

export default ButtonWithLoadingIndicator;