interface DataType {
	id: number;
	img: string;
	title: string;
	new_price: number;
	// old_price: number;
	// ratting: number;
	// review_text: number;
}

const best_seller: DataType[] = [
	{
		id: 1,
		img: "/assets/img/product/service/1.png",
		title: "Wash & Stream Iron",
		new_price: 75,
		// old_price: 89,
		// ratting: 4.88,
		// review_text: 39,
	},
	{
		id: 2,
		img: "/assets/img/product/service/2.png",
		title: "Wash & Fold",
		new_price: 40,
		// old_price: 159,
		// ratting: 4.82,
		// review_text: 125,
	},
	
	
];

export default best_seller;
