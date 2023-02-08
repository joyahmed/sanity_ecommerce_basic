import { AiOutlineShopping } from '@/constants';
import Link from 'next/link';
import React from 'react';
import { useApp } from '../context/AppContext';
import { Cart } from './';

const Navbar = () => {
	const { cartItems, setShowCart, totalQuantity, cartQuantity } =
		useApp();
	return (
		<header className='relative flex flex-row justify-between w-full h-auto px-4 sm:px-16 mb-2.5 -mt-3'>
			<Link href='/' className='font-bold text-[17px]'>
				J<span className='text-red-400'>&apos;</span>s Music Store🔴
			</Link>

			<button
				className='relative flex text-[25px] text-[gray] mr-1 sm:mr-0 cursor-pointer bg-transparent border-0 hover:scale-110 transition-all duration-300'
				type='button'
				onClick={() => setShowCart(prev => !prev)}
			>
				<AiOutlineShopping />
				<span className='absolute right-[-8px] text-[12px] text-[#eee] bg-[#f02d34] w-[18px] h-[18px] rounded-full text-center font-bold'>
					{totalQuantity}
				</span>
			</button>
			<Cart />
		</header>
	);
};

export default Navbar;
