import React, {useState, useEffect} from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import Layout from '../components/Layout';
import { userService } from '../services/user.service';
import '../styles/app.scss';

export default function MyApp({ Component, pageProps }) {
	const router = useRouter();
	const [authorized, setAuthorized] = useState(false);

	useEffect(() => { 
		require("bootstrap/dist/js/bootstrap.bundle.min.js");

		// // Run auth check on initial load
		// authCheck(router.asPath);

		// // Set authorized to false to hide page content while changing routes
		// const hideContent = () => setAuthorized(false);
		// router.events.on('routeChangeStart', hideContent);

		// // Run auth check on route change
		// router.events.on('routeChangeStart', authCheck);

		// // Unsubscribe from events in useEffect return function
		// return () => {
		// 	router.events.off('routeChangeStart', hideContent);
		// 	router.events.off('routeChangeComplete', authCheck);
		// }
	}, []);

	function authCheck(url) {
		// Redirect to login page if accessing a private page and not logged in
		const publicPaths = ['/login'];
		const path = url.split('?')[0];
		if (!userService.userValue && !publicPaths.includes(path)) {
			setAuthorized(false);
			router.push({
				pathname: '/login',
				query: { returnUrl: router.asPath }
			});
		}
		else {
			setAuthorized(true);
		}
	}

	return (
		<>
			<Head>
				<meta name="viewport" content="initial-scale=1, width=device-width" />
			</Head>
			<Layout>
				{/* {authorized && */}
					<Component {...pageProps} />
				{/* } */}
			</Layout>
		</>	
	);
}
