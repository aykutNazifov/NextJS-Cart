import React, { useState, useMemo, useEffect } from "react";
import Header from "../components/header/Header";
import styles from "../styles/Store.module.scss";
import axios from "axios";
import SingleProduct from "../components/singleProduct/SingleProduct";
import SearchIcon from "@mui/icons-material/Search";
import ReactPaginate from "react-paginate";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

export async function getServerSideProps() {
	const data = await axios("https://dummyjson.com/products?limit=100");
	const products = data.data.products;

	return {
		props: { products },
	};
}

function Store({ products }) {
	const [currentPage, setCurrentPage] = useState(0);
	const [searchInput, setSearchInput] = useState("");
	const [sortOption, setSortOption] = useState("");
	const [categoryOption, setCategoryOption] = useState("");
	let selectedProducts;
	const productsPerPage = 9;
	const offset = currentPage * productsPerPage;

	const sortProducts = useMemo(() => {
		if (sortOption === "priceInc") {
			products.sort((a, b) => (a.price > b.price ? 1 : -1));
		}
		if (sortOption === "priceDec") {
			products.sort((a, b) => (a.price > b.price ? -1 : 1));
		}
		if (sortOption === "rating") {
			products.sort((a, b) => (a.rating > b.rating ? 1 : -1));
		}
		if (sortOption === "random") {
			products.sort((a, b) => 0.5 - Math.random());
		}
	}, [sortOption]);

	if (categoryOption !== "") {
		products = products.filter(
			(product) => product.category === categoryOption
		);
	}

	const filteredProducts = products.filter((product) =>
		product.title.toLowerCase().includes(searchInput.toLowerCase())
	);

	const currentProducts = filteredProducts.slice(
		offset,
		offset + productsPerPage
	);

	function handlePageClick({ selected: selectedPage }) {
		setCurrentPage(selectedPage);
	}

	const pageCount = Math.ceil(filteredProducts.length / productsPerPage);

	return (
		<>
			<Header />
			<div className={styles.Store}>
				<h1>Store</h1>
				<div className={styles.Options}>
					<div className={styles.Search}>
						<input
							placeholder="Search..."
							type="text"
							value={searchInput}
							onChange={(e) => setSearchInput(e.target.value)}
						/>
						<div className={styles.Search_Icon}>
							<SearchIcon />
						</div>
					</div>
					<div className={styles.Sort}>
						<select
							value={sortOption}
							onChange={(e) => setSortOption(e.target.value)}
						>
							<option disabled value="">
								Sort by:
							</option>
							<option value="random">Random</option>
							<option value="priceInc">Price Increase</option>
							<option value="priceDec">Price Decrease</option>
							<option value="rating">Rating</option>
						</select>
					</div>
					<div className={styles.Category}>
						<select
							value={categoryOption}
							onChange={(e) => setCategoryOption(e.target.value)}
						>
							<option disabled value="">
								Category:
							</option>
							<option value="">All</option>
							<option value="smartphones">Smartphones</option>
							<option value="laptops">Laptops</option>
							<option value="fragrances">Fragrances</option>
							<option value="skincare">Skincare</option>
							<option value="groceries">Groceries</option>
							<option value="furniture">Furniture</option>
							<option value="sunglasses">Sunglasses</option>
						</select>
					</div>
				</div>
				<div className={styles.Products}>
					{currentProducts.map((product) => (
						<SingleProduct
							key={product.id}
							imgSrc={product.thumbnail}
							title={product.title}
							price={product.price}
							id={product.id}
						/>
					))}
				</div>
				<ReactPaginate
					pageRangeDisplayed={3}
					marginPagesDisplayed={1}
					previousLabel={<NavigateBeforeIcon />}
					nextLabel={<NavigateNextIcon />}
					pageCount={pageCount}
					onPageChange={handlePageClick}
					containerClassName={"pagination"}
					previousLinkClassName={"pagination_link"}
					nextLinkClassName={"pagination_link"}
					disabledClassName={"pagination_link_disabled"}
					activeClassName={"pagination_link_active"}
				/>
			</div>
		</>
	);
}

export default Store;
