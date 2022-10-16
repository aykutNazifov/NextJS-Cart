const formatter = new Intl.NumberFormat(undefined, {
	currency: "USD",
	style: "currency",
});

export default function formatPrice(price) {
	return formatter.format(price);
}
