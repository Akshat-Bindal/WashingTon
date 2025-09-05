'use client';

import { useState, ChangeEvent, KeyboardEvent } from 'react';
import { useRouter } from 'next/navigation';

const OtpConfirm = () => {
	const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
	const [notification, setNotification] = useState<string>("");
	const router = useRouter();

	const handleChange = (element: HTMLInputElement, index: number) => {
		const value = element.value.replace(/[^0-9]/g, ''); // Ensure only numbers are entered

		if (value.length === 1) {
			const newOtp = [...otp];
			newOtp[index] = value;
			setOtp(newOtp);

			// Move to next input field if current one is filled
			if (index < otp.length - 1) {
				const nextElement = document.getElementById(`otp-input-${index + 1}`) as HTMLInputElement;
				nextElement?.focus();
			}
		}
	};

	const handleBackspace = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
		if (e.key === 'Backspace' && otp[index] === "") {
			if (index > 0) {
				const prevElement = document.getElementById(`otp-input-${index - 1}`) as HTMLInputElement;
				prevElement?.focus();
			}
		}
	};

	// ✅ Handle resend OTP
	const handleResendOTP = () => {
		setNotification("OTP resent successfully ✅");

		setTimeout(() => {
			setNotification("");
		}, 3000);
	};

	return (
		<>
			<div className="login-wrapper d-flex align-items-center justify-content-center text-center">
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-10 col-lg-8">

							<div className="text-start rtl-text-right">
								<h5 className="mb-1 text-white">Verify OTP</h5>
								<p className="mb-4 text-white">
									Enter the OTP code sent to
									<span className="mx-1">Email Id</span>
								</p>
							</div>

							<div className="otp-verify-form mt-5">
								<form action="/home" onSubmit={(e) => e.preventDefault()}>
									<div className="d-flex justify-content-between mb-5 rtl-flex-d-row-r">
										{otp.map((data, index) => (
											<input
												key={index}
												id={`otp-input-${index}`}
												className="single-otp-input form-control text-center"
												type="text"
												value={data}
												placeholder="-"
												maxLength={1}
												onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e.target, index)}
												onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => handleBackspace(e, index)}
											/>
										))}
									</div>

									<button className="btn btn-warning btn-lg w-100" type="submit">
										Verify & Proceed
									</button>
								</form>
							</div>

							{/* Resend OTP + Back Button */}
							<div className="login-meta-data mt-3 text-center">
								<p className="mb-2">
									Didn’t receive the OTP?
									<button
										type="button"
										className="btn btn-link p-0 mx-1 text-warning fw-bold"
										onClick={handleResendOTP}
									>
										Resend OTP
									</button>
								</p>

								{/* ✅ Back Button */}
								<button
									type="button"
									className="btn btn-outline-light btn-sm mt-2"
									onClick={() => router.back()}
								>
									⬅ Back
								</button>
							</div>

							{/* ✅ Notification */}
							{notification && (
								<div className="alert alert-success mt-3 p-2 small">
									{notification}
								</div>
							)}

						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default OtpConfirm;
