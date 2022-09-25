import { useState, useEffect } from 'react';

import NavLink from './NavLink';
import { userService } from '../services/user.service';

export default function NavBar() {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const subscription = userService.user.subscribe(user => setUser(user));
		return () => subscription.unsubscribe();
	}, []);

	function logout() {
		userService.logout();
	}

	// Show NavBar only when logged in.
	if (!user) return null;

	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm" style={{ height: "72px", paddingTop: "16px", paddingBottom: "16px" }}>
			<div className="container-fluid">
				<a className="navbar-brand ms-2" href="#">Dashboard</a>
				
				
				
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<li className="nav-item">
							<NavLink href="/" exact className="nav-item nav-link">Home</NavLink>
						</li>
						<li className="nav-item">
							<a onClick={logout} className="nav-item nav-link">Log Out</a>
						</li>		

						{/* <li className="nav-item dropdown">
							<a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
								Dropdown
							</a>
							<ul className="dropdown-menu" aria-labelledby="navbarDropdown">
								<li><a className="dropdown-item" href="#">Action</a></li>
								<li><a className="dropdown-item" href="#">Another action</a></li>
								<li><hr className="dropdown-divider" /></li>
								<li><a className="dropdown-item" href="#">Something else here</a></li>
							</ul>
						</li> */}
					</ul>
				
				</div>
			</div>
		</nav>
	);
}