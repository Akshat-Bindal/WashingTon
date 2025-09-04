interface DataType {
	id: number;
	img: string;
	category: string;
	stock: number;
}

const collections_products: DataType[] = [
	{
		id: 1,
		img: "/assets/img/product/categories (1).png",
		category: "Women",
		stock: 50,
	},
	{
		id: 1,
		img: "/assets/img/product/categories (2).png",
		category: "Men",
		stock: 30,
	},
	{
		id: 1,
		img: "/assets/img/product/categories (3).png",
		category: "Kids",
		stock: 4,
	},
	
];

export default collections_products;
