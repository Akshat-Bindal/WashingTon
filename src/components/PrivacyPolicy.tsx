import Footer from "@/layouts/Footer";
import HeaderTwo from "@/layouts/HeaderTwo";
import React from "react";

const PrivacyPolicy = () => {
	return (
		<>
			<HeaderTwo links="home" title="Privacy Policy" />

			<div className="page-content-wrapper">
				<div className="container">
					<div className="privacy-policy-wrapper py-3">
						<h6>PRIVACY POLICY</h6>
						<p>
							Washing Ton Laundry Service values your trust. This Privacy Policy explains how we collect, use, and protect your personal information when you use our laundry pickup and delivery services.
						</p>
						<h6>Information We Collect</h6>
						<p>
							When you use our services, we may collect:
<br></br>
<b>Personal Information:</b> Name, phone number, email address, and home address.
<br></br>

<b> Order Details:</b> Type of clothes, service preferences (wash, dry, iron, etc.), and delivery instructions.
<br></br>
<b> Payment Information:</b> UPI, card, or wallet details (processed securely through third-party providers – we do not store your full payment details).
<br></br>
<b> Usage Data:</b> Date/time of pickup, delivery, and service history.
						</p>
						<h6>How We Use Your Information</h6>
						<p>
							We use your information to:
<br></br>
Provide laundry pickup and delivery services.
<br></br>
Communicate order status, pickup, and delivery updates.
<br></br>
Process payments securely.
<br></br>
Improve our services and customer experience.
<br></br>
Send offers, promotions, and service updates (only if you consent).
						</p>
						<h6>Sharing of Information</h6>
						<p>
							We do not sell or rent your personal information. We may share data only with:

Delivery staff (to collect and deliver clothes).

Payment processors (to complete secure transactions).

Legal authorities (only if required by law).
						</p>
						<p>
							Some Personally Identifiable Information may also be provided to
							intermediaries and third parties who assist us with the Service,
							but who may make no use of any such information other than to
							assist us in providing the Service. Except as otherwise provided
							in this Privacy Policy, however, we will not rent or sell your
							Personally Identifiable Information to third parties.
						</p>
						
						<h6>STORAGE AND SECURITY OF INFORMATION</h6>
						<p className="mb-0">
							We take reasonable measures to protect your personal information from unauthorized access, misuse, or disclosure. However, no system is 100% secure, and we cannot guarantee absolute security.
						</p>
					</div>
				</div>
			</div>

			<div className="internet-connection-status" id="internetStatus"></div>

			<Footer />
		</>
	);
};

export default PrivacyPolicy;
