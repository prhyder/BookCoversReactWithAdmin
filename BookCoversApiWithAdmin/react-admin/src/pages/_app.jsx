import React, {useEffect} from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import '../styles/app.scss';

export default function MyApp(props) {
	useEffect(() => { 
		require("bootstrap/dist/js/bootstrap.bundle.min.js");
	}, []);

	const { Component, pageProps } = props;

	return (
		<>
			<Head>
				<meta name="viewport" content="initial-scale=1, width=device-width" />
			</Head>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</>	
	);
}
