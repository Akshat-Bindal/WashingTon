"use client";

import React from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/features/cartSlice";

const HeroSlider = () => {
	const dispatch = useDispatch();

	// Items for Hero buttons (like your top_product list)
	const heroProducts = {
		dryClean: {
			id: "dry-clean-1",
			title: "Dry Clean",
			new_price: 300,
			img: "/assets/img/bg-img/a2.png",
		},
		washFold: {
			id: "wash-fold-1",
			title: "Wash & Fold",
			new_price: 40,
			img: "/assets/img/bg-img/a1.png",
		},
		washIron: {
			id: "wash-iron-1",
			title: "Wash & Iron",
			new_price: 40,
			img: "/assets/img/bg-img/a5.png",
		},
		sofaCare: {
			id: "sofa-care-1",
			title: "Sofa Care",
			new_price: 300,
			img: "/assets/img/bg-img/a4.png",
		},
	};

	const handleAddToCart = (item: any) => {
		dispatch(addToCart(item));
	};

	return (
		<>
			<div className="hero-wrapper">
				<div className="container">
					<div className="pt-3">
						<Swiper
							loop={true}
							pagination={true}
							modules={[Pagination]}
							className="hero-slides owl-carousel"
						>
							{/* Dry Clean */}
							<SwiperSlide
								className="single-hero-slide"
								style={{ backgroundImage: `url(/assets/img/bg-img/a2.png)` }}
							>
								<div className="slide-content h-100 d-flex align-items-center">
									<div className="slide-text">
										<h4 className="text-white mb-0">Dry Clean</h4>
										<p className="text-white">Your Dirty Clothes</p>
										<a
											className="btn btn-primary"
											onClick={() => handleAddToCart(heroProducts.dryClean)}
											style={{ cursor: "pointer" }}
										>
											Clean Now
										</a>
									</div>
								</div>
							</SwiperSlide>

							{/* Wash & Fold */}
							<SwiperSlide
								className="single-hero-slide"
								style={{ backgroundImage: `url(/assets/img/bg-img/a1.png)` }}
							>
								<div className="slide-content h-100 d-flex align-items-center">
									<div className="slide-text">
										<h4 className="text-white mb-0">Wash & Fold</h4>
										<p className="text-white">Now only ₹40 per kg</p>
										<a
											className="btn btn-primary"
											onClick={() => handleAddToCart(heroProducts.washFold)}
											style={{ cursor: "pointer" }}
										>
											Wash Now
										</a>
									</div>
								</div>
							</SwiperSlide>

							{/* Wash & Iron */}
							<SwiperSlide
								className="single-hero-slide"
								style={{ backgroundImage: `url(/assets/img/bg-img/a5.png)` }}
							>
								<div className="slide-content h-100 d-flex align-items-center">
									<div className="slide-text">
										<h4 className="text-black mb-0">Wash & Iron</h4>
										<p className="text-blue">Now only ₹75 per kg</p>
										<a
											className="btn btn-primary"
											onClick={() => handleAddToCart(heroProducts.washIron)}
											style={{ cursor: "pointer" }}
										>
											Wash Now
										</a>
									</div>
								</div>
							</SwiperSlide>

							{/* Sofa Care */}
							<SwiperSlide
								className="single-hero-slide"
								style={{ backgroundImage: `url(/assets/img/bg-img/a4.png)` }}
							>
								<div className="slide-content h-100 d-flex align-items-center">
									<div className="slide-text">
										<h4 className="text-white mb-0">Sofa Care</h4>
										<p className="text-white">₹300 per Seat</p>
										<a
											className="btn btn-primary"
											onClick={() => handleAddToCart(heroProducts.sofaCare)}
											style={{ cursor: "pointer" }}
										>
											Dry Clean Now
										</a>
									</div>
								</div>
							</SwiperSlide>
						</Swiper>
					</div>
				</div>
			</div>
		</>
	);
};

export default HeroSlider;
