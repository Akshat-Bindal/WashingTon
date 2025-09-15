"use client";

import React from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/features/cartSlice";
import hero_services_json from "@/data/hero_slider.json";

interface HeroService {
	_id: { $oid: string };
	name: string;
	price: number;
	description: string;
	imageUrl: string;
}

// ✅ Tell TS that it's an array of HeroService
const hero_services: HeroService[] = hero_services_json as HeroService[];

const HeroSlider = () => {
	const dispatch = useDispatch();

	const handleAddToCart = (item: HeroService) => {
		const productData = {
			service: item._id.$oid,
			title: item.name,
			price: item.price,
			img: item.imageUrl,
			quantity: 1,
		};
		dispatch(addToCart(productData));
	};

	return (
		<div className="hero-wrapper">
			<div className="container">
				<div className="pt-3">
					<Swiper
						loop={true}
						pagination={{ clickable: true }}
						modules={[Pagination]}
						className="hero-slides owl-carousel"
					>
						{hero_services.map((item: HeroService, i: number) => (
							<SwiperSlide
								key={i}
								className="single-hero-slide"
								style={{ backgroundImage: `url(${item.imageUrl})` }}
							>
								<div className="slide-content h-100 d-flex align-items-center">
									<div className="slide-text">
										<h4
											className="mb-0"
											style={{
												color: item.name.includes("Wash & Iron") ? "#000000ff" : "white", // gold if Wash & Iron, else white
											}}
										>
											{item.name}
										</h4>
										<p
											style={{
												color: item.name.includes("Wash & Iron") ? "#000000ff" : "white",
											}}
										>
											{item.description}
										</p>
										<a
											className="btn btn-primary"
											onClick={() => handleAddToCart(item)}
											style={{ cursor: "pointer" }}
										>
											{item.name.includes("Wash") ? "Wash Now" : "Clean Now"}
										</a>
									</div>
								</div>

							</SwiperSlide>
						))}
					</Swiper>
				</div>
			</div>
		</div>
	);
};

export default HeroSlider;
