import React, { useState } from "react";
import styles from "./Header.module.scss";
import Link from "next/link";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCart } from "../../context/CartContext";
import Cart from "../cart/Cart";

const Header = () => {
	const { cart } = useCart();
	const [isCartOpen, setIsCartOpen] = useState(false);

	const handleIsCartOpen = () => {
		setIsCartOpen(!isCartOpen);
	};

	return (
		<>
			<nav className={styles.Header}>
				<h2>LOGO</h2>
				<ul>
					<li>
						<Link href="/">
							<a>Home</a>
						</Link>
					</li>
					<li>
						<Link href="/about">
							<a>About</a>
						</Link>
					</li>
					<li>
						<Link href="/store">
							<a>Store</a>
						</Link>
					</li>
				</ul>
				<div className={styles.Cart} onClick={handleIsCartOpen}>
					<ShoppingCartIcon />
					{cart.length !== 0 && (
						<span className={styles.Quantity}>{cart.length}</span>
					)}
				</div>
			</nav>
			<Cart isCartOpen={isCartOpen} handleIsCartOpen={handleIsCartOpen} />
		</>
	);
};

export default Header;
