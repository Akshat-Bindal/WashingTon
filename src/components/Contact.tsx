"use client";
import React from "react";
import Footer from "@/layouts/Footer";
import HeaderTwo from "@/layouts/HeaderTwo";
import NiceSelect from "@/ui/NiceSelect";

const Contact = () => {
	const selectHandler = (e: any) => {};

	return (
		<>
			<HeaderTwo links="home" title="Contact" />

			<div className="page-content-wrapper">
				<div className="google-maps-wrap">
					<iframe
						src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3561.2648685408226!2d75.81252877565835!3d26.799693676714757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396dc993c7dc6fad%3A0xf7184f9e60d8e675!2sSno%20White%20Laundry!5e0!3m2!1sen!2sin!4v1753096039415!5m2!1sen!2sin"
						allowFullScreen={true}
						aria-hidden="false"
						tabIndex={0}
					></iframe>
				</div>
				<div className="container">
					<div className="card">
						<div className="card-body">
							<div className="rtl-text-right">
								<h5 className="mb-1">Contact Us</h5>
								<p className="mb-4">
									
									<b>Contact Number +91 9461832236</b>
									<br></br>
									Write to us. We will reply to you as soon as possible. But
									yes, it can take up to 24 hours.
								</p>
							</div>

							<div className="contact-form mt-3">
								<form onSubmit={(e) => e.preventDefault()}>
									<input
										className="form-control border mb-3"
										id="username"
										type="text"
										placeholder="Your Name"
									/>
									<input
										className="form-control border mb-3"
										id="email"
										type="email"
										placeholder="Enter email"
									/>

									<NiceSelect
										className="contact_select mb-3 w-100 border d-flex align-items-center"
										options={[
											{ value: "00", text: "Order Not Pickup" },
											{ value: "01", text: "Order Delayed" },
											{ value: "02", text: "Cloth Missing" },
											{ value: "04", text: "Dry Clean Issue" },
											{ value: "04", text: "Cleaning Issue" },
											{ value: "04", text: "Other" },
										]}
										defaultCurrent={0}
										onChange={selectHandler}
										placeholder="Select an option"
										name="myNiceSelect"
									/>

									{/* <input
										className="form-control border mb-3"
										id="username"
										type="text"
										placeholder="Include a relevant URL"
									/> */}
									<textarea
										className="form-control border mb-3"
										id="message"
										name=""
										cols={30}
										rows={10}
										placeholder="Write something..."
									></textarea>
									<button className="btn btn-primary btn-lg w-100">
										Send Now
									</button>
								</form>
							</div>
						</div>
					</div>
					<div className="pb-3"></div>
				</div>
			</div>

			<div className="internet-connection-status" id="internetStatus"></div>

			<Footer />
		</>
	);
};

export default Contact;
