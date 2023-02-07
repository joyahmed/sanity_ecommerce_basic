import { client } from '@/lib/client';
import { Inter } from '@next/font/google';
import Head from 'next/head';

import { FooterBanner, HeroBanner, Product } from '@/screens';

const Home = ({ productsData, bannerData }) => {
	return (
		<div className='flex flex-col items-center justify-center overflow-hidden'>
			<Head>
				<meta name='description' content="J's Music Store🔴" />
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1'
				/>
				{/* <link rel='icon' href='/favicon.ico' /> */}
			</Head>
			<HeroBanner
				{...{ heroBanner: bannerData?.length && bannerData[0] }}
			/>
			<div className='flex flex-col items-center justify-center w-full my-5'>
				<h2 className='font-bold text-2xl sm:text-3xl'>
					Best Selling Products
				</h2>
				<p className='text-sm text-[gray]'>
					Speakers of many variations
				</p>
			</div>
			<div className='flex flex-wrap items-center justify-center w-full'>
				{productsData?.map(product => (
					<Product key={product._id} {...{ product }} />
				))}
			</div>
			<FooterBanner
				{...{ footerBanner: bannerData && bannerData[0] }}
			/>
		</div>
	);
};

export default Home;

export const getServerSideProps = async () => {
	const productQuery = '*[_type == "product"]';
	const productsData = await client.fetch(productQuery);

	const bannerQuery = '*[_type == "banner"]';
	const bannerData = await client.fetch(bannerQuery);

	return {
		props: {
			productsData,
			bannerData
		}
	};
};
