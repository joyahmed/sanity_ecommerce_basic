import {
	AiFillInstagram,
	AiOutlineCopyright,
	AiOutlineTwitter
} from '@/constants';
import { GET_FULL_YEAR } from '@/FUNCS/getFullYear';

const Footer = () => {
	return (
		<footer className='flex flex-col items-center justify-center w-full space-y-2 mt-6'>
			<div className='flex items-center justify-center font-semibold text-sm text-[gray]'>
				<AiOutlineCopyright className='w-3 h-3 mr-1' />{' '}
				{GET_FULL_YEAR()} J
				<span className='text-red-400'>&apos;</span>s Music Store🔴
				All rights reserved
			</div>
			<div className='flex flex-row text-xl space-x-2'>
				<AiFillInstagram className='icon scale-up' />
				<AiOutlineTwitter className='icon scale-up' />
			</div>
		</footer>
	);
};

export default Footer;
