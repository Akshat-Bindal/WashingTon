"use client";
import Footer from "@/layouts/Footer";
import HeaderTwo from "@/layouts/HeaderTwo";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditProfile = () => {
	const [userData, setUserData] = useState({
		name: "",
		phone: "",
		email: "",
		shipping: "",
		profilePicture: "",
	});
	const [loading, setLoading] = useState(true);

	// Fetch user data on mount
	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const res = await fetch(
					"https://laundry-backend-fg99.onrender.com/api/users/me",
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${localStorage.getItem("token")}`,
						},
					}
				);
				const data = await res.json();
				if (data) {
					setUserData({
						name: data.name || "",
						phone: data.phone || "",
						email: data.email || "",
						shipping: data.addresses?.[0] || "",
						profilePicture: data.profilePicture || "",
					});
				}
				setLoading(false);
			} catch (error) {
				console.error(error);
				setLoading(false);
			}
		};

		fetchUserData();
	}, []);

	// Handle input changes
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setUserData((prev) => ({ ...prev, [name]: value }));
	};

	// Handle form submit
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const res = await fetch(
				"https://laundry-backend-fg99.onrender.com/api/users/me",
				{
					method: "PUT", // ✅ use PATCH
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
					body: JSON.stringify({
						name: userData.name,
						phone: userData.phone,
						addresses: [userData.shipping],
					}),
				}
			);

			const data = await res.json();
			if (res.ok) {
				toast.success("🎉 Profile updated successfully!", {
					position: "top-center",
					autoClose: 3000,
				});
			} else {
				toast.error("⚠️ Something went wrong", {
					position: "top-center",
					autoClose: 3000,
				});
			}

		} catch (error) {
			console.error(error);
			alert("Something went wrong");
		}
	};

	if (loading) return <p>Loading...</p>;

	return (
		<>
			<HeaderTwo links="profile" title="Edit Profile" />

			<div className="page-content-wrapper">
				<div className="container">
					<div className="profile-wrapper-area py-3">
						<div className="card user-info-card">
							<div className="card-body p-4 d-flex align-items-center">
								<div className="user-profile me-3">
									{/* Profile picture is fetched here */}
									<img
										src={userData.profilePicture || "/assets/img/core-img/avatar.jpg"}
										alt="Profile"
									/>
									<div className="change-user-thumb">
										<form onSubmit={(e) => e.preventDefault()}>
											<input className="form-control-file" type="file" />
										</form>
									</div>
								</div>
								<div className="user-info">
									<h5 className="mb-0 text-white">{userData.name}</h5>
								</div>
							</div>
						</div>

						<div className="card user-data-card">
							<div className="card-body">
								<form onSubmit={handleSubmit}>
									<div className="mb-3">
										<label className="form-label">Full Name</label>
										<input
											className="form-control"
											type="text"
											name="name" // ✅ match state
											value={userData.name}
											onChange={handleChange}
										/>
									</div>

									<div className="mb-3">
										<label className="form-label">Phone</label>
										<input
											className="form-control"
											type="text"
											name="phone"
											value={userData.phone}
											onChange={handleChange}
										/>
									</div>

									<div className="mb-3">
										<label className="form-label">Email (read-only)</label>
										<input
											className="form-control"
											type="email"
											name="email"
											value={userData.email}
											disabled // ✅ backend does not update email
										/>
									</div>

									<div className="mb-3">
										<label className="form-label">Shipping Address</label>
										<input
											className="form-control"
											type="text"
											name="shipping"
											value={userData.shipping}
											onChange={handleChange}
										/>
									</div>

									<button className="btn btn-primary btn-lg w-100" type="submit">
										Save Changes
									</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
			<ToastContainer />
			<Footer />
		</>
	);
};

export default EditProfile;
