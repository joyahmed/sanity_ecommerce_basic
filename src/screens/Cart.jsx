import {
	AiOutlineMinus,
	AiOutlinePlus,
	AiOutlineRight,
	AiOutlineShopping,
	TiDeleteOutline
} from '@/constants';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useApp } from '../context/AppContext';
import { urlFor } from '../lib/client';
import getStripe from '../lib/getStripe';

const Cart = () => {
	const cartRef = useRef();
	const {
		mounted,
		totalPrice,
		totalQuantity,
		cartItems,
		showCart,
		setShowCart,
		removeFromCart,
		toggleCartItemQuantity
	} = useApp();

	const [animate, setAnimate] = useState(false);

	const handleCloseCart = () => {
		setAnimate(prev => !prev);
		setTimeout(() => (setShowCart(prev => !prev),setAnimate(prev => !prev)), 150);
	};

	const handleCheckout = async () => {
		const stripe = await getStripe();

		const response = await fetch('/api/stripe', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`
			},

			body: JSON.stringify({ cartItems })
		});

		if (response.statusCode === 500) return;

		const data = await response.json();

		toast.loading('Redirecting...');

		stripe.redirectToCheckout({ sessionId: data.id });
	};

	if (!mounted) return null;

	return (
		<div
			ref={cartRef}
			className={`fixed right-0 top-0 w-screen min-h-screen z-[100] bg-black/5 transition-all duration-300 ease-in-out
      ${
				showCart
					? 'translate-x-0 transition-animation'
					: 'translate-x-[200vw] transition-animation'
			}
      `}
		>
			<div className='relative w-full sm:w-[600px] h-screen bg-white sm:float-right px-4 sm:px-[40px] py-10'>
				<button
					type='button'
					className='flex items-center w-full text-[18px] cursor-pointer gap-[2px] ml-[10px] border-0 bg-transparent text-sm font-bold px-5'
					onClick={handleCloseCart}
				>
					<span className='ml-[10px]'>Your Cart</span>
					<span className='ml-[10px] text-[#f02d34]'>
						({totalQuantity} items)
					</span>
					<span
						className={`${
							animate ? 'translate-x-[30rem] scale-0 opacity-0  transition-all duration-500 ease-out' : 'scale-100 opacity-100 translate-x-0'
						}`}
					>
						<AiOutlineRight />
					</span>
				</button>
				{cartItems === null && (
					<div className='flex flex-col m-[40px] items-center justify-center w-full'>
						<AiOutlineShopping size={150} />
						<h3 className='text-[20px] font-bold'>
							Your shopping bag is empty
						</h3>
						<Link href='/' className='w-full text-center'>
							<button
								type='buton'
								onClick={() => setShowCart(prev => !prev)}
								className='w-[55%] h-10 bg-primary rounded-3xl mt-5 font-bold uppercase text-white'
							>
								Continue Shopping
							</button>
						</Link>
					</div>
				)}
				<div className='mt-[15px] sm:mt-[10px] px-[20px] py-[10px] h-[calc(100vh_-_13rem)] overflow-y-auto space-y-7'>
					{cartItems !== null &&
						cartItems.length >= 1 &&
						cartItems.map(item => (
							<div
								key={item?._id}
								className='flex items-start justify-between px-[20px] py-[5px] gap-5 h-[6rem]'
							>
								{item?.image ? (
									<Image
										src={`${urlFor(item.image[0])}`}
										alt={item?.name}
										width={100}
										height={100}
										className='bg-gray-200 rounded-lg'
									/>
								) : null}
								<div className='flex flex-col font-bold justify-between w-full h-[6rem]'>
									<div className='flex items-start justify-between w-full h-full'>
										<h5>{item?.name}</h5>
										<h4>${item?.price}</h4>
									</div>
									<div className='flex justify-between w-full h-full'>
										<div>
											<p className='flex flex-row'>
												<span
													className='product-buttons'
													onClick={() =>
														toggleCartItemQuantity(
															item._id,
															'decrement'
														)
													}
												>
													<AiOutlineMinus />
												</span>
												<span className='quantity'>
													{item?.quantity}
												</span>
												<span
													className='product-buttons'
													onClick={() =>
														toggleCartItemQuantity(
															item._id,
															'increment'
														)
													}
												>
													<AiOutlinePlus />
												</span>
											</p>
										</div>
										<button
											type='button'
											className=''
											onClick={() => removeFromCart(item._id)}
										>
											<TiDeleteOutline />
										</button>
									</div>
								</div>
							</div>
						))}
				</div>
				<div className='absolute bottom-10 w-screen sm:w-[500px] font-bold px-10'>
					{cartItems?.length >= 1 && (
						<div className='flex flex-col items-center w-full space-y-4'>
							<div className='flex justify-between w-full'>
								<h3>Subtotal: </h3>
								<h3>${totalPrice}</h3>
							</div>
							<div className='flex justify-center w-full'>
								<button
									className='bg-primary w-[90%] h-10 text-white rounded-3xl'
									onClick={handleCheckout}
								>
									Pay with Stripe
								</button>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Cart;
