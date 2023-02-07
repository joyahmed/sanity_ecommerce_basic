import Head from 'next/head';
import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';

const Layout = ({ children }) => {
	return (
		<div className='py-[10px]'>
			<Head>
				<title>J&apos;s Music Store🔴</title>
			</Head>
			<main className='relative flex flex-col justify-between my-[18px] w-screen px-4 sm:px-10 min-h-screen'>
				<Navbar />
				{children}
				<Footer />
			</main>
		</div>
	);
};

export default Layout;
