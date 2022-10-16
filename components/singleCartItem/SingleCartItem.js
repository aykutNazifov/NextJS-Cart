import React from "react";
import styles from "./SingleCartItem.module.scss";
import Image from "next/image";
import { useCart } from "../../context/CartContext";
import formatPrice from "../../utils/formatPrice";

const SingleCartItem = ({ imgSrc, title, price, quantity, id }) => {
	const { addToCart, cart, removeFromCart } = useCart();

	const totalItemPrice = price * quantity;

	return (
		<div className={styles.Cart_Product}>
			<div className={styles.Image}>
				<Image
					src={imgSrc}
					alt={title}
					layout="fill"
					objectFit="cover"
				/>
			</div>
			<div className={styles.Info}>
				<h5>{title}</h5>
				<span>{formatPrice(price)}</span>
			</div>
			<div className={styles.Buttons}>
				<button onClick={() => removeFromCart(id)}>-</button>
				<p>{quantity}</p>
				<button onClick={() => addToCart(title, price, imgSrc, id)}>
					+
				</button>
			</div>
			<div className={styles.Item_Total_Price}>
				{formatPrice(totalItemPrice)}
			</div>
		</div>
	);
};

export default SingleCartItem;
