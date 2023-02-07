import {
	AiFillStar,
	AiOutlineMinus,
	AiOutlinePlus,
	AiOutlineStar
} from '@/constants';
import { useApp } from '@/context/AppContext';
import { client, urlFor } from '@/lib/client';
import { Carousel } from '@/screens';
import Image from 'next/image';
import { useState } from 'react';

const ProductDetail = ({ product, products }) => {
	const { image, name, details, price } = product;
	const [index, setIndex] = useState(0);
	const [margin, setMargin] = useState('');
	const {
		mounted,
		quantity,
		setShowCart,
		handleQuantity,
		addToCart
	} = useApp();

	const handleBuyNow = () => {
		addToCart(product, quantity);
		setShowCart(prev => !prev);
	};

	if (!mounted) return null;

	return (
		<div className='flex items-start justify-center overflow-hidden'>
			<div className=''>
				<div className='flex flex-col sm:flex-row items-start justify-center h-full space-y-10 sm:space-y-0 sm:space-x-10'>
					<div className='flex flex-col w-full md:w-1/2 h-full'>
						<div className='flex items-center justify-center w-full px-4 bg-primary rounded-lg'>
							<Image
								src={`${urlFor(image && image[index])}`}
								alt={name}
								width={500}
								height={500}
								lazy
								className=' cursor-pointer hover:scale-110 hover:scale-up'
							/>
						</div>
						<div
							className={`flex items-center justify-start sm:justify-center h-28 hover:overflow-x-scroll w-full my-3 px-4
							 ${
									margin === ''
										? 'scale-100 transition-animation'
										: 'scale-[90%] transition-animation'
								}
							`}
							onMouseEnter={() => setMargin('ml-10')}
							onMouseLeave={() => setMargin('')}
						>
							{image?.map((item, i) => (
								<Image
									key={i}
									src={`${urlFor(item)}`}
									alt={name}
									width={70}
									height={70}
									lazy
									onMouseEnter={() => setIndex(i)}
									className={`rounded-md mx-[5px] cursor-pointer ${
										i === index ? 'bg-primary' : 'bg-gray-200'
									}
									${i === 0 ? `${margin} transition-animation` : ''}
									`}
								/>
							))}
						</div>
					</div>
					<div className='flex flex-col items-start justify-center w-full sm:w-1/2 my-auto px-4 space-y-5'>
						<h1 className='text-3xl font-bold'>{name}</h1>
						<div className='flex flex-row items-center justify-center my-2 text-primary h-auto'>
							<AiFillStar />
							<AiFillStar />
							<AiFillStar />
							<AiFillStar />
							<AiOutlineStar />
							<span className='text-sm font-semibold'>(20)</span>
						</div>
						<div className='space-y-1'>
							<h4 className='text-[20px] font-bold'>Details</h4>
							<p className='text-[gray]'>{details}</p>
						</div>
						<span className='text-primary text-2xl font-bold'>
							${price}
						</span>
						<div className='space-y-3'>
							<h3 className='text-[20px] font-bold'>Quantity</h3>
							<p className='flex flex-row'>
								<span
									className='product-buttons'
									onClick={() => handleQuantity('decrement')}
								>
									<AiOutlineMinus />
								</span>
								<span className='quantity'>{quantity}</span>
								<span
									className='product-buttons'
									onClick={() => handleQuantity('increment')}
								>
									<AiOutlinePlus />
								</span>
							</p>
						</div>
						<div className='flex flex-wrap w-full space-y-2 md:space-y-0 md:space-x-6'>
							<button
								type='button'
								className='cart-buttons text-primary border-[1px] border-primary'
								onClick={() => addToCart(product, quantity)}
							>
								Add to Cart
							</button>
							<button
								type='button'
								className='cart-buttons bg-primary text-white'
								onClick={handleBuyNow}
							>
								Buy Now
							</button>
						</div>
					</div>
				</div>
				<Carousel {...{ products }} />
			</div>
		</div>
	);
};

export default ProductDetail;

export const getStaticPaths = async () => {
	const query = `*[_type == "product"] {
    slug {
      current
    }
  }
  `;

	const products = await client.fetch(query);

	const paths = products.map(product => ({
		params: {
			slug: product.slug.current
		}
	}));

	return {
		paths,
		fallback: 'blocking'
	};
};

export const getStaticProps = async ({ params: { slug } }) => {
	const productQuery = `*[_type == "product" && slug.current == '${slug}'][0]`;
	const productsQuery = `*[_type == 'product']`;

	const product = await client.fetch(productQuery);
	const products = await client.fetch(productsQuery);

	return {
		props: {
			product,
			products
		}
	};
};
