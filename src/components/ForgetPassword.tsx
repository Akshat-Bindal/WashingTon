"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ForgetPassword = () => {
	const router = useRouter();

	return (
		<>
			<div className="login-wrapper d-flex align-items-center justify-content-center text-center">
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-10 col-lg-8">
							<Image
								className="big-logo"
								src="/assets/img/core-img/logo2.png"
								alt="App Logo"
								width={100}
								height={100}
							/>

							<div className="register-form mt-5">
								<form action="/forget-password-success" method="get">
									<div className="form-group text-start mb-4">
										<span>Email</span>
										<label htmlFor="email">
											<i className="ti ti-user"></i>
										</label>
										<input
											className="form-control"
											id="email"
											type="text"
											placeholder="info@gmail.com"
										/>
									</div>
									<button
										className="btn btn-warning btn-lg w-100"
										type="submit"
									>
										Reset Password
									</button>
								</form>

								{/* ✅ Back Button */}
								<div className="mt-3 text-center">
									<button
										type="button"
										className="btn btn-outline-light btn-sm"
										onClick={() => router.back()}
									>
										⬅ Back
									</button>
								</div>
							</div>
							
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ForgetPassword;
