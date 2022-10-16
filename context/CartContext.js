import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext({});

export function useCart() {
	return useContext(CartContext);
}

export function CartProvider({ children }) {
	const [cart, setCart] = useState([]);

	useEffect(() => {
		const items = JSON.parse(localStorage.getItem("cart"));
		if (items) {
			setCart(items);
		}
	}, []);

	useEffect(() => {
		if (cart !== []) {
			localStorage.setItem("cart", JSON.stringify(cart));
		}
	}, [cart]);

	const addToCart = (title, price, imgSrc, id) => {
		const item = cart.find((product) => product.id === id);

		if (!item) {
			setCart([...cart, { title, price, imgSrc, id, quantity: 1 }]);
		} else {
			setCart(
				cart.map((product) => {
					if (product.id === id) {
						return { ...product, quantity: product.quantity + 1 };
					} else {
						return product;
					}
				})
			);
		}
	};

	const removeFromCart = (id) => {
		const item = cart.find((product) => product.id === id);

		if (item.quantity === 1) {
			setCart(cart.filter((product) => product.id !== id));
		} else {
			setCart(
				cart.map((product) => {
					if (product.id === id) {
						return { ...product, quantity: product.quantity - 1 };
					} else {
						return product;
					}
				})
			);
		}
	};

	const clearTheCart = () => {
		setCart([]);
	};

	return (
		<CartContext.Provider
			value={{ cart, addToCart, removeFromCart, clearTheCart }}
		>
			{children}
		</CartContext.Provider>
	);
}
