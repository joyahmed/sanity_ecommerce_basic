import { urlFor } from '@/lib/client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const FooterBanner = ({
	footerBanner: {
		discount,
		largeText1,
		largeText2,
		saleTime,
		smallText,
		midText,
		product,
		buttonText,
		image,
		desc
	}
}) => {
	return (
		<div className='relative w-full h-[600px] sm:h-[400px] text-white leading-[40px] bg-[#f02d34] rounded-lg px-4 sm:px-16 mt-[80px] sm:mt-[120px]'>
			<div className='flex flex-wrap items-start justify-between h-full'>
				<div className='flex flex-col items-start justify-start w-full sm:w-1/3 h-[300px] sm:h-auto my-auto space-y-5'>
					<p className='font-semibold'>{discount}</p>
					<h3 className='text-[60px] font-bold leading-[50px] -ml-1'>
						{largeText1}
					</h3>
					<h3 className='text-[60px] font-bold leading-[50px] -ml-1'>
						{largeText2}
					</h3>
					<p className='font-semibold'>{saleTime}</p>
				</div>

				<Image
					src={`${urlFor(image)}`}
					alt='Product Image'
					width={500}
					height={500}
					sizes='(max-width: 768px) 100vw,
																(max-width: 1200px) 50vw,
																33vw'
					className='absolute left-20 sm:left-40 top-[5rem] sm:-top-28'
				/>

				<div className='flex flex-col items-start justify-start w-full sm:w-1/3 h-[300px] sm:h-auto my-auto space-y-5'>
					<p className='font-semibold'>{smallText}</p>
					<div className='flex flex-col space-y-1'>
						<h3 className='text-[50px] font-bold leading-[53px] '>{midText}</h3>
						<p>{desc}</p>
					</div>
					<Link href={`/product/${product}`}>
						<button className='rounded-xl text-[#f02d34] font-semibold  bg-white px-3.5 hover:scale-[103%] scale-up'>
							{buttonText}
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default FooterBanner;
