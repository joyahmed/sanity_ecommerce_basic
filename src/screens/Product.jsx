import { urlFor } from '@/lib/client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Product = ({ product: { image, name, slug, price } }) => {
	const handleClick = link => {
		window.location.assign(link);
	};

	return (
		<div className='flex flex-wrap w-[200px] sm:mt-20'>
			<Link href={`/product/${slug.current}`}>
				<div className='p-2'>
					<div className='bg-gray-200 hover:bg-primary rounded-lg hover:scale-up cursor-pointer'>
						<Image
							src={`${urlFor(image && image[0])}`}
							alt={name}
							width={250}
							height={250}
							className='p-5 hover:scale-110  hover:scale-up'
						/>
					</div>
					<p className='text-sm text-[gray] mt-[3px]'>{name}</p>
					<p className='text-sm font-bold'>${price}</p>
				</div>
			</Link>
		</div>
	);
};

export default Product;
