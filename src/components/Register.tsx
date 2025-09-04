import Link from "next/link";
import React from "react";

const Register = () => {
	return (
		<>
			<div className="login-wrapper d-flex align-items-center justify-content-center text-center">
				<div className="background-shape"></div>
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-10 col-lg-8">
							{/* Heading instead of logo */}
							<h2 className="text-white fw-bold">WASHING TONS</h2>
							
							<h6 className="text-white fw-bold">User Registration</h6>

							<div className="register-form mt-5">
								<form action="/otp" method="post">
									{/* Name */}
									<div className="form-group text-start mb-4">
										<span>Full Name</span>
										<label htmlFor="name">
											<i className="ti ti-user"></i>
										</label>
										<input
											className="form-control"
											id="name"
											type="text"
											placeholder="Enter your full name"
											required
										/>
									</div>

									{/* Contact Number */}
									<div className="form-group text-start mb-4">
										<span>Contact Number</span>
										<label htmlFor="contact">
											<i className="ti ti-phone"></i>
										</label>
										<input
											className="form-control"
											id="contact"
											type="tel"
											placeholder="Enter your contact number"
											required
										/>
									</div>

									{/* Address */}
									<div className="form-group text-start mb-4">
										<span>Address</span>
										<label htmlFor="address">
											<i className="ti ti-map-pin"></i>
										</label>
										<input
											className="form-control"
											id="address"
											type="text"
											placeholder="Enter your address"
											required
										/>
									</div>

									{/* Email */}
									<div className="form-group text-start mb-4">
										<span>Email</span>
										<label htmlFor="email">
											<i className="ti ti-at"></i>
										</label>
										<input
											className="form-control"
											id="email"
											type="email"
											placeholder="help@example.com"
											required
										/>
									</div>

									{/* Password */}
									<div className="form-group text-start mb-4">
										<span>Password</span>
										<label htmlFor="password">
											<i className="ti ti-key"></i>
										</label>
										<input
											className="form-control"
											id="password"
											type="password"
											placeholder="Password"
											required
										/>
									</div>

									{/* Confirm Password */}
									<div className="form-group text-start mb-4">
										<span>Confirm Password</span>
										<label htmlFor="confirmPassword">
											<i className="ti ti-lock"></i>
										</label>
										<input
											className="form-control"
											id="confirmPassword"
											type="password"
											placeholder="Confirm password"
											required
										/>
									</div>

									{/* Submit */}
									<button
										className="btn btn-warning btn-lg w-100"
										type="submit"
									>
										Sign Up
									</button>
								</form>
							</div>

							{/* Already have account */}
							<div className="login-meta-data">
								<p className="mt-3 mb-0">
									Already have an account?
									<Link className="mx-1" href="/login">
										Sign In
									</Link>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Register;
