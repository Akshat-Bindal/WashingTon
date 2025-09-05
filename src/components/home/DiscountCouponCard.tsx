import React from "react";

const DiscountCouponCard = () => {
	return (
		<>
			<div className="container">
				<div className="discount-coupon-card p-4 p-lg-5 dir-rtl">
					<div className="d-flex align-items-center">
						<div className="discountIcon">
							<img
								className="w-100"
								src="/assets/img/core-img/discount.png"
								alt=""
							/>
						</div>
						<div className="text-content">
							<h5 className="text-white mb-2">Get free doorstep pickup & deliver</h5>
							<p className="text-white mb-0">
								on minimum 5 kg orders within 5 km in
								<span className="px-1 fw-bold">Pratap Nagar, Sanganer, Jagatpura, and Sitapura</span>Book now with Washing Ton Laundry Service!
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default DiscountCouponCard;
