export default function NavBar() {
	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm" style={{ height: "72px", paddingTop: "16px", paddingBottom: "16px" }}>
			<div className="container-fluid">
				<a className="navbar-brand ms-2" href="#">Dashboard</a>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNav">
					
				</div>
			</div>
		</nav>
	);
}