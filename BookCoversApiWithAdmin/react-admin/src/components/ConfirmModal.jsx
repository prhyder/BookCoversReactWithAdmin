export default ({text, onClickYes}) => {
	return (
		<>
			{/* Hidden button that triggers the modal. */}
			{/* Use showConfirmModalButton.click() to trigger the modal. */}
			<button
				type="button"
				id="showConfirmModalButton"
				data-bs-toggle="modal"
				style={{ display: "none" }}
				data-bs-target="#confirmationModal">
			</button>
			
			<div className="modal" id="confirmationModal" tabIndex="-1">
				<div className="modal-dialog">
					<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">You have unsaved changes</h5>
						<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div className="modal-body">
						<p>{text}</p>
					</div>
					<div className="modal-footer">
						<button onClick={onClickYes} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel and discard changes</button>
						<button type="button" className="btn btn-primary" data-bs-dismiss="modal">Continue editing</button>
					</div>
					</div>
				</div>
			</div>
		</>
		
	);
}