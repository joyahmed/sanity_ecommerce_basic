import { Product } from '@/screens';

const Carousel = ({ products }) => (
	<div className='mt-20 w-full text-center'>
		<h2 className='text-3xl font-bold'>You may also like</h2>
		<div className='relative w-full h-[400px] overflow-x-hidden'>
			<div className='flex items-center justify-center h-full'>
				<div className='w-[200%] h-full overflow-hidden relative'>
					<div
						className={`flex items-center justify-betwee w-[200%] h-auto absolute left-0 text-left animate-scroll carousel`}
					>
						{products.map(product => (
							<div key={product._id} className='w-[20rem]'>
								<Product key={product._id} {...{ product }} />
							</div>
						))}
						{products.map(product => (
							<div key={product._id} className='w-[20rem]'>
								<Product key={product._id} {...{ product }} />
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	</div>
);

export default Carousel;