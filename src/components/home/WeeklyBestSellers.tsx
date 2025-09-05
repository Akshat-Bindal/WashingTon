"use client";
import best_seller from "@/data/best_seller";
import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/features/cartSlice";

const WeeklyBestSellers = () => {
	const dispatch = useDispatch();

	const handleAddToCart = (item: any) => {
		dispatch(addToCart(item));
	};

	return (
		<>
			<div className="weekly-best-seller-area py-3">
				<div className="container">
					<div className="section-heading d-flex align-items-center justify-content-between dir-rtl">
						<h6>Services</h6>
						{/* <button className="btn btn-sm btn-light">
							View all<i className="ms-1 ti ti-arrow-right"></i>
						</button> */}
					</div>
					<div className="row g-2">
						{best_seller.map((item, i) => (
							<div key={i} className="col-12">
								<div
									className="card horizontal-product-card"
									onClick={() => handleAddToCart(item)} // ✅ Add to Cart on click
									style={{ cursor: "pointer" }}
								>
									<div className="d-flex align-items-center">
										<div className="product-thumbnail-side">
											<div className="product-thumbnail d-block">
												<img src={item.img} alt={item.title} />
											</div>
											<button
												className="wishlist-btn"
												type="button"
												onClick={(e) => {
													e.stopPropagation(); // Prevent triggering addToCart
													alert("Added to wishlist ❤️"); // You can connect to wishlist state later
												}}
											>
												<i className="ti ti-heart"></i>
											</button>
										</div>
										<div className="product-description">
											<p className="product-title d-block mb-1 fw-bold">
												{item.title}
											</p>

											<p className="sale-price">
												<i className="ti ti-basket"></i> ₹{item.new_price}
											</p>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
};

export default WeeklyBestSellers;
