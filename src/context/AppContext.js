import {
	createContext,
	useContext,
	useEffect,
	useState
} from 'react';
import { toast } from 'react-hot-toast';
import { BsDoorClosedFill } from 'react-icons/bs';
import { useLocalStorage } from '../hooks/useLocalStorage';

const AppContext = createContext();

const AppProvider = ({ children }) => {
	const [showCart, setShowCart] = useState(false);
	const [cartItems, setCartItems] = useLocalStorage(
		'shopping-cart',
		[]
	);
	const [totalPrice, setTotalPrice] = useState(0);
	const [totalQuantity, setTotalQuantity] = useState(0);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		const handleMount = setMounted(true);
		return () => handleMount;
	}, []);

	const cartQuantity = cartItems.reduce(
		(quantity, item) => item?.quantity + quantity,
		0
	);

	const getItemQuantity = id => {
		return cartItems.find(item => item._id === id)?.quantity || 0;
	};

	useEffect(() => {
		setTotalQuantity(
			cartItems.reduce(
				(quantity, item) => item?.quantity + quantity,
				0
			)
		);

		setTotalPrice(
			cartItems.reduce((price, item) => item?.price + price, 0) * cartQuantity
		);
	}, [cartItems, cartQuantity]);

	const increaseCartQuantity = id => {};

	const decreaseCartQuantity = id => {};
	const removeFromCart = id => {
		setCartItems(currItems => {
			return currItems.filter(item => item._id !== id);
		});
	};

	const addToCart = (product, newQuantity) => {
		const isInCart = cartItems?.find(
			item => item._id === product._id
		);
		const updatedCart = isInCart
			? cartItems.map(item =>
					item._id === isInCart._id
						? { ...item, quantity: item.quantity + newQuantity }
						: item
			  )
			: [...cartItems, { ...product, quantity: newQuantity }];

		setTotalPrice(prev => prev + product.price * newQuantity);
		setTotalQuantity(prev => prev + newQuantity);
		setCartItems(updatedCart);
		localStorage.setItem(
			'shopping-cart',
			JSON.stringify(updatedCart)
		);

		toast.success(`${newQuantity} ${product.name} added to the cart.`);
	};

	const toggleCartItemQuantity = (id, type) => {
		const productFound = cartItems.find(item => item._id === id);
		if (productFound.quantity === 1 && type === 'decrement') return;

		const index = cartItems.findIndex(product => product._id === id);
		const newCartItems = [...cartItems];
		const updatedProduct = {
			...productFound,
			quantity:
				type === 'increment'
					? productFound.quantity + 1
					: productFound.quantity - 1
		};
		newCartItems.splice(index, 1, updatedProduct);
		setCartItems(newCartItems);
		localStorage.setItem(
			'shopping-cart',
			JSON.stringify(newCartItems)
		);
		setTotalPrice(
			prev =>
				prev +
				(type === 'increment'
					? updatedProduct.price
					: -updatedProduct.price)
		);
		setTotalQuantity(prev => prev + (type === 'increment' ? 1 : -1));
	};

	console.log(`totalPrice => =>`, totalPrice);

	return (
		<AppContext.Provider
			value={{
				mounted,
				showCart,
				setShowCart,
				cartItems,
				setCartItems,
				totalPrice,
				setTotalPrice,
				totalQuantity,
				setTotalQuantity,
				addToCart,
				removeFromCart,
				toggleCartItemQuantity,
				getItemQuantity,
				increaseCartQuantity,
				decreaseCartQuantity,
				cartQuantity
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export { AppProvider, AppContext };

export const useApp = () => useContext(AppContext);

// const toggleCartItemQuantity = (id, type) => {
// 	productFound = cartItems.find(item => item._id === id);
// 	index = cartItems.findIndex(product => product._id === id);
// 	const newCartItems = [...cartItems];

// 	if (type === 'increment') {
// 		newCartItems.splice(index, 1, {
// 			...productFound,
// 			quantity: productFound.quantity + 1
// 		});
// 		setCartItems(newCartItems);
// 		setTotalPrice(prev => prev + productFound.price);
// 		setTotalQuantity(prev => prev + 1);
// 	} else if (type === 'decrement') {
// 		if (productFound.quantity > 1) {
// 			newCartItems.splice(index, 1, {
// 				...productFound,
// 				quantity: productFound.quantity - 1
// 			});
// 			setCartItems(newCartItems);
// 			setTotalPrice(prev => prev - productFound.price);
// 			setTotalQuantity(prev => prev - 1);
// 		}
// 	}
// };
