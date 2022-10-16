import React from "react";
import styles from "./SingleProduct.module.scss";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../../context/CartContext";
import formatPrice from "../../utils/formatPrice";

const SingleProduct = ({ imgSrc, title, price, id }) => {
	const { addToCart, cart, removeFromCart } = useCart();
	const item = cart.find((product) => product.id === id);
	return (
		<div className={styles.Product}>
			<div className={styles.Product_Head}>
				<Image
					src={imgSrc}
					alt={title}
					layout="fill"
					objectFit="cover"
				/>
			</div>
			<div className={styles.Product_Body}>
				<h3>
					<Link href={`/products/${id}`}>
						<a>{title}</a>
					</Link>
				</h3>
				<p>{formatPrice(price)}</p>
			</div>
			<div className={styles.Product_Foot}>
				{item ? (
					<div className={styles.Buttons}>
						<button onClick={() => removeFromCart(id)}>-</button>
						<span>{item.quantity}</span>
						<button
							onClick={() => addToCart(title, price, imgSrc, id)}
						>
							+
						</button>
					</div>
				) : (
					<button onClick={() => addToCart(title, price, imgSrc, id)}>
						+ Add to Cart
					</button>
				)}
			</div>
		</div>
	);
};

export default SingleProduct;
