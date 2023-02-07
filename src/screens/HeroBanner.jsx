import { urlFor } from '@/lib/client';
import Image from 'next/image';
import Link from 'next/link';

const HeroBanner = ({ heroBanner }) => {
	return (
		<div className='relative flex flex-col w-full h-[400px] sm:h-[500px] py-[40px] bg-[#dcdcdc] rounded-[15px] px-4 sm:px-[55px]'>
			<h5 className='text-[15px] sm:text-[25px]'>
				{heroBanner?.smallText}
			</h5>
			<h3 className='text-[2rem] sm:text-[5rem] font-bold  leading-[45px] sm:leading-[60px]'>
				{heroBanner?.midText}
			</h3>
			<h1 className='text-white text-[6em] sm:text-[12em] font-bold uppercase -mt-[2rem] sm:-mt-[3.5rem] -ml-2'>
				{heroBanner?.largeText1}
			</h1>

			<div className='absolute left-[25%] -top-2 sm:left-[27%] w-1/2 h-[40rem]'>
				<div className='relative w-[23rem] h-[23rem] sm:w-[35rem] sm:h-[35rem]'>
					<Image
						src={`${urlFor(heroBanner?.image)}`}
						alt='headphones'
						fill
						sizes='(max-width: 768px) 100vw,
		                (max-width: 1200px) 50vw,
		                100vw'
						priority
						className='hover:scale-[103%] transition-all duration-300 ease'
					/>
				</div>
			</div>

			<Link href={`/product/${heroBanner.product}`}>
				<button
					type='button'
					className='rounded-3xl px-8 py-2 bg-[#f02d34] text-white border-0 text-[18px] font-semibold cursor-pointer z-50 hover:scale-[103%] transition-all durtion-300 ease'
				>
					{heroBanner.buttonText}
				</button>
			</Link>
			<div className='absolute right-10 bottom-[5%] sm:bottom-[60px] flex items-end flex-col w-[300px] text-[#324d67] leading-[40px]'>
				<h5 className='font-bold'>Description</h5>
				<p className='text-[gray]'>{heroBanner.desc}</p>
			</div>
		</div>
	);
};

export default HeroBanner;
