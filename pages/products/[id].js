import React from "react";
import Image from "next/image";
import Header from "../../components/header/Header";
import styles from "../../styles/SingleProductPage.module.scss";
import axios from "axios";
import formatPrice from "../../utils/formatPrice";
import { useCart } from "../../context/CartContext";
import { useRouter } from "next/router";
export async function getServerSideProps({ query }) {
	const { id } = query;

	const data = await axios(`https://dummyjson.com/products/${id}`);

	return {
		props: {
			product: data.data,
		},
	};
}

const SingleProductPage = ({ product }) => {
	const { addToCart, cart, removeFromCart } = useCart();
	const item = cart.find((p) => p.id === product.id);

	return (
		<>
			<Header />
			<section className="Section">
				<div className={styles.SingleProductPage}>
					<div className={styles.Image}>
						<Image
							src={product.images[1]}
							layout="fill"
							objectFit="cover"
						/>
					</div>
					<div className={styles.Content}>
						<h2>{product.title}</h2>
						<h6>Brand: {product.brand}</h6>
						<p>{product.description}</p>
						<div className={styles.Price_Wrapper}>
							<span>{formatPrice(product.price)}</span>
							<span>In Stock: {product.stock}</span>
						</div>
						{item ? (
							<div className={styles.Buttons}>
								<button
									onClick={() => removeFromCart(product.id)}
								>
									-
								</button>
								<span>{item.quantity}</span>
								<button
									onClick={() =>
										addToCart(
											product.title,
											product.price,
											product.thumbnail,
											product.id
										)
									}
								>
									+
								</button>
							</div>
						) : (
							<button
								onClick={() =>
									addToCart(
										product.title,
										product.price,
										product.thumbnail,
										product.id
									)
								}
							>
								+ Add to Cart
							</button>
						)}
					</div>
				</div>
			</section>
		</>
	);
};

export default SingleProductPage;
