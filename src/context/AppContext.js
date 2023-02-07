import {
	createContext,
	useContext,
	useEffect,
	useState
} from 'react';
import { toast } from 'react-hot-toast';

const AppContext = createContext();

const getLocalCartData = () => {
	if (localStorage) {
		let localCartData = localStorage.getItem('cartItems');
		if (localCartData === []) return [];
		else {
			return JSON.parse(localCartData);
		}
	}
};

const AppProvider = ({ children }) => {
	const [showCart, setShowCart] = useState(false);
	const [cartItems, setCartItems] = useState([]);
	const [totalPrice, setTotalPrice] = useState(0);
	const [totalQuantity, setTotalQuantity] = useState(0);
	const [ quantity, setQuantity ] = useState(1);
	const [ mounted, setMounted ] = useState(false);

	useEffect(() => {
		const handleMount = setMounted(true);
		return () => handleMount;
	}, []);

	useEffect(() => {
		const data = getLocalCartData();

		if (data) {
			setCartItems(data),
				setTotalPrice(
					data.reduce((total, item) => total + item?.price, 0)
				),
				setTotalQuantity(
					data.reduce((total, item) => total + item?.quantity, 0)
				);
		}
	}, []);

	let productFound;
	let index;

	const addToCart = (product, newQuantity) => {
		const isInCart = cartItems?.find(
			item => item._id === product._id
		);

		setTotalPrice(prev => prev + product.price * newQuantity);
		setTotalQuantity(prev => prev + newQuantity);

		if (isInCart) {
			const updatedCart = cartItems?.map(cartProduct => {
				if (cartProduct._id === product._id)
					return {
						...cartProduct,
						quantity: cartProduct.quantity + newQuantity
					};
			});

			localStorage.setItem('cartItems', JSON.stringify(updatedCart));
			setCartItems(updatedCart);
		} else {
			product.quantity = newQuantity;

			const cart = [...cartItems, { ...product }];

			localStorage.setItem('cartItems', JSON.stringify(cart));

			setCartItems([...cartItems, { ...product }]);
		}
		toast.success(`${quantity} ${product.name} added to the cart.`);
	};

	const removeFromCart = product => {
		productFound = cartItems.find(item => item._id === product._id);
		const newCartItems = cartItems.filter(
			item => item._id !== product._id
		);
		setTotalPrice(
			prev => prev - productFound.price * productFound.quantity
		);
		setTotalQuantity(prev => prev - productFound.quantity);
		setCartItems(newCartItems);
		localStorage.setItem('cartItems', JSON.stringify(newCartItems));
	};

	const toggleCartItemQuantity = (id, type) => {
		productFound = cartItems.find(item => item._id === id);
		index = cartItems.findIndex(product => product._id === id);
		const newCartItems = [...cartItems];

		if (type === 'increment') {
			newCartItems.splice(index, 1, {
				...productFound,
				quantity: productFound.quantity + 1
			});
			setCartItems(newCartItems);
			setTotalPrice(prev => prev + productFound.price);
			setTotalQuantity(prev => prev + 1);
		} else if (type === 'decrement') {
			if (productFound.quantity > 1) {
				newCartItems.splice(index, 1, {
					...productFound,
					quantity: productFound.quantity - 1
				});
				setCartItems(newCartItems);
				setTotalPrice(prev => prev - productFound.price);
				setTotalQuantity(prev => prev - 1);
			}
		}
	};

	const handleQuantity = type => {
		type === 'increment'
			? setQuantity(prev => prev + 1)
			: setQuantity(prev => (prev - 1 <= 1 ? 1 : prev - 1));
	};

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
				quantity,
				handleQuantity,
				addToCart,
				removeFromCart,
				toggleCartItemQuantity
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export { AppProvider, AppContext };

export const useApp = () => useContext(AppContext);
