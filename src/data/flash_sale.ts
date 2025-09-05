interface DataType {
	id: number;
	color: string;
	img: string;
	new_price: number;
	// old_price: number;
	// discount: number;
	// test: string;
	title: string;
}

const flash_sale: DataType[] = [
	{
		id: 1,
		color: "",
		img: "/assets/img/product/1.png",
		new_price: 300,
		// old_price: 450,
		// // discount: 33,
		// test: "Sold",
		title: "Sofa Chair",
	},
	{
		id: 2,
		color: "",
		img: "/assets/img/product/2.png",
		new_price: 250,
		// old_price: 21,
		// discount: 77,
		// test: "Sold",
		title: "Sneaker",
	},
	{
		id: 3,
		color: "bg-danger",
		img: "/assets/img/product/3.png",
		new_price: 120,
		// old_price: 49,
		// discount: 99,
		// test: "Sold",
		title: "Sweater",
	},
	{
		id: 4,
		color: "bg-danger",
		img: "/assets/img/product/4.png",
		new_price: 120,
		// old_price: 49,
		// discount: 99,
		// test: "Sold",
		title: "Hoodie",
	},

	{
		id: 5,
		color: "bg-danger",
		img: "/assets/img/product/a1.png",
		new_price: 100,
		// old_price: 49,
		// discount: 99,
		// test: "Sold",
		title: "Shirt",
	},

	{
		id: 6,
		color: "bg-danger",
		img: "/assets/img/product/a2.png",
		new_price: 150,
		// old_price: 49,
		// discount: 99,
		// test: "Sold",
		title: "Jacket",
	},

	{
		id: 7,
		color: "bg-danger",
		img: "/assets/img/product/a3.png",
		new_price: 250,
		// old_price: 49,
		// discount: 99,
		// test: "Sold",
		title: "FrockCan",
	},

	{
		id: 8,
		color: "bg-danger",
		img: "/assets/img/product/a4.png",
		new_price: 300,
		// old_price: 49,
		// discount: 99,
		// test: "Sold",
		title: "Lehenga",
	},
	
	
	
];

export default flash_sale;
