import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '../../public/images/logo.png';

export default function SideNav() {
	const router = useRouter();

	const navItems = [
		{ name: "Home", path: "/", isActive: false },
		{ name: "Book Covers", path: "/bookCovers", isActive: false },
		{ name: "Genres", path: "/genres", isActive: false },
	];

	const activeRoute = (routeName, currentRoute) => {
		let basePath = `/${(currentRoute.split('/'))[1]}`;
		return routeName === basePath ? true : false;
	}

	return (
		<div id="collapseSidenav" className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style={{ width: "270px" }}>
			<Link href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
				<>
					<svg className="bi me-2" width="40" height="32"></svg>
					<div style={{ display: "flex", alignItems: "center" }}>
						<Image src={Logo}
							width={26}
							height={40}
							layout="fixed"
						/>
						<span className="fs-5 mx-1">
							Elemental
						</span>
						{/* <a class="btn" data-bs-toggle="collapse" href="#collapseSidenav">
								X
							</a> */}
					</div>
				</>
			</Link>
			<hr />
			<ul className="nav nav-pills flex-column mb-auto">
				{navItems.map((navItem, index) => (
					<Link href={navItem.path} key={index}>
						<>
							<li key={navItem.name} className="nav-item">
								<a href={navItem.path} className={`nav-link ${activeRoute(navItem.path, router.pathname) ? 'active' : ''}`} aria-current="page">
									<svg className="bi me-2" width="16" height="16"></svg>
									{navItem.name}
								</a>
							</li>
						</>
					</Link>
				))}
			</ul>
			<hr />
			<div className="dropdown">
				<a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
					<img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2" />
					<strong>mdo</strong>
				</a>
				<ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
					<li><a className="dropdown-item" href="#">New project...</a></li>
					<li><a className="dropdown-item" href="#">Settings</a></li>
					<li><a className="dropdown-item" href="#">Profile</a></li>
					<li><hr className="dropdown-divider" /></li>
					<li><a className="dropdown-item" href="#">Sign out</a></li>
				</ul>
			</div>
		</div>
	);
}