import React from "react";
import styles from "./Cart.module.scss";
import SingleCartItem from "../singleCartItem/SingleCartItem";
import { useCart } from "../../context/CartContext";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import formatPrice from "../../utils/formatPrice";

const Cart = ({ isCartOpen, handleIsCartOpen }) => {
	const { cart, clearTheCart } = useCart();

	const totalPrice = cart.reduce(
		(total, item) => total + item.price * item.quantity,
		0
	);

	return (
		<div
			className={
				isCartOpen ? `${styles.Cart} ${styles.Cart_Open}` : styles.Cart
			}
		>
			<div className={styles.Close} onClick={handleIsCartOpen}>
				<HighlightOffIcon />
			</div>
			<h3>Shopping Cart</h3>
			{cart.length === 0 ? (
				<p className={styles.Empty}>Cart is Empty</p>
			) : (
				<>
					<div className={styles.Cart_Products}>
						{cart.map((item) => (
							<SingleCartItem
								key={item.id}
								title={item.title}
								price={item.price}
								imgSrc={item.imgSrc}
								quantity={item.quantity}
								id={item.id}
							/>
						))}
					</div>
					<div className={styles.Checkout}>
						<p>Total: {formatPrice(totalPrice)}</p>
						<button onClick={clearTheCart}>Clear the Cart</button>
						<button>CHECKOUT</button>
					</div>
				</>
			)}
		</div>
	);
};

export default Cart;
