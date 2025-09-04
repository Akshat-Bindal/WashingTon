import Footer from "@/layouts/Footer";
import HeaderTwo from "@/layouts/HeaderTwo";
import Link from "next/link";
import React from "react";

const Aboutus = () => {
	return (
		<>
			<HeaderTwo links="home" title="About Us" />

			<div className="page-content-wrapper py-3">
				<div className="container">
					<div className="card">
						<div className="card-body">
							<div className="about-content-wrap dir-rtl">
								<img className="mb-3" src="/assets/img/bg-img/12.png" alt="" />
								<h5>
									Laundry Made Easy, Right at Your Doorstep
								</h5>
								<p>
									At Washing Ton Laundry Service, we make laundry simple and stress-free. We provide convenient home service laundry solutions with free pickup and delivery right at your doorstep.
								</p>
								<p>
									Our services are available across Pratap Nagar, Sanganer, Sitapura, and Jagatpura, ensuring that you enjoy fresh, clean, and well-handled clothes without leaving your home.
								</p>
								<ul className="mb-3 ps-3">
									<li>
										<i className="ti ti-check me-1"></i>Free Pickup & Drop at your preferred time.
									</li>
									<li>
										<i className="ti ti-check me-1"></i>Professional Cleaning & Care for all types of clothes.
									</li>
									<li>
										<i className="ti ti-check me-1"></i>Affordable & Reliable Service you can count on.
									</li>
								</ul>
								<p>
									With Washing Ton Laundry Service, you save time and energy while we handle your laundry with care—because your comfort and satisfaction are our top priorities.
								</p>
								<div className="row g-2">
									<div className="col-6">
										<img
											className="mb-3 rounded"
											src="/assets/img/bg-img/about1.png"
											alt=""
										/>
									</div>
									<div className="col-6">
										<img
											className="mb-3 rounded"
											src="/assets/img/bg-img/about2.png"
											alt=""
										/>
									</div>
								</div>
								<p>
									A versatile e-commerce shop template. It is very nicely
									designed with modern features & coded with the latest
									technology.
								</p>
								<p>
									It nicely views on all devices with smartphones, tablets,
									laptops & desktops.
								</p>
								<h6>Our Laundry Promise</h6>
								<p>
									Every garment is handled with care using high-quality cleaning methods to ensure freshness, hygiene, and long-lasting fabric life. Whether it’s daily wear, office formals, or delicate clothes, we treat your laundry as if it were our own.
								</p>
								<h6>What Our Customers Say</h6>
								<p>
									Our customers love the convenience, punctuality, and quality we provide. From quick doorstep pickups to on-time delivery, their feedback inspires us to keep improving and delivering the best laundry experience in Jaipur.
								</p>
								<div className="contact-btn-wrap text-center">
									<p className="mb-2">
										For more information, submit a request.
									</p>
									<Link
										className="btn btn-primary btn-lg w-100"
										href="/contact"
									>
										<i className="ti ti-mail me-2"></i>Submit A Query
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="internet-connection-status" id="internetStatus"></div>

			<Footer />
		</>
	);
};

export default Aboutus;
