interface DataType {
  id: number;
  img: string;
  title: string;
  price: number;  // changed from new_price
}



const best_seller: DataType[] = [
  { id: 1, img: "/assets/img/product/service/1.png", title: "Wash & Stream Iron", price: 75 },
  { id: 2, img: "/assets/img/product/service/2.png", title: "Wash & Fold", price: 40 },
];

export default best_seller;
