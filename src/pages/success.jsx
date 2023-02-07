import { BsBagCheckFill } from '@/constants';
import { useApp } from '@/context/AppContext';
import Link from 'next/link';
import { useEffect } from 'react';
import { runFireworks } from '../lib/utils';

const Success = () => {
	const { setCartItems, setTotalPrice, setTotalQuantity } = useApp();

	useEffect(() => {
		localStorage.clear();
		setCartItems([]);
		setTotalPrice(0);
		setTotalQuantity(0);
    runFireworks();
    //eslint-disable-next-line
	}, []);

	return (
		<div className='flex flex-col items-center justify-center min-h-[69vh]'>
			<div className='flex flex-col items-center justify-center bg-gray-200 rounded-lg w-2/3 h-[330px] text-xs font-bold p-5'>
				<BsBagCheckFill size={35} />
				<div className='flex flex-col items-center justify-center space-y-1'>
					<h2 className='text-2xl'>Thank you for your order!</h2>
					<p>Check your email inbox for the receipt.</p>
				</div>
				<p className='my-5'>
					If you have any question, please email:{' '}
					<a
						href='mailto:order@jsmusicstore.com'
						className='text-red-500'
					>
						order@jsmusicstore.com
					</a>
				</p>
				<Link
					href='/'
					className='flex items-center justify-center bg-primary rounded-2xl text-white font-bold text-lg uppercase w-[300px] h-12 mt-7 hover:transition-animation hover:scale-110 '
				>
					Continue Shopping
				</Link>
			</div>
		</div>
	);
};

export default Success;
