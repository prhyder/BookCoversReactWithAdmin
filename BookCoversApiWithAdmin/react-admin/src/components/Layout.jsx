import React from 'react';
import SideNav from '../components/SideNav';
import NavBar from '../components/NavBar';

const Layout = (({ children }) => {
	return (
		<>
			<div style={{ display: "flex",  flex: "270px", height: "100vh"}}>
				<SideNav />
				<div style={{ flex: 1 }} >
					<NavBar/>
					{children}
				</div>
			</div>
		</>
	);
});

export default Layout;