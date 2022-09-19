export default function Spinner(props) {
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