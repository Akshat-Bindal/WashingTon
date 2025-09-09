"use client";

import Offcanvas from "@/components/common/Offcanvas";
import Link from "next/link";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const Header = () => {
	const [show, setShow] = useState(false);
	const handleShow = () => setShow(!show);

	// ✅ Get cart items from Redux
	const cartItems = useSelector((state: any) => state.cart.cart);

	// ✅ Calculate total quantity
	const totalItems = cartItems.reduce(
		(total: number, item: any) => total + item.quantity,
		0
	);

	return (
		<>
			<div className="header-area" id="headerArea">
				<div className="container h-100 d-flex align-items-center justify-content-between d-flex rtl-flex-d-row-r">
					{/* Logo */}
					<div className="logo-wrapper">
						<Link href="/home">
							<img src="/assets/img/core-img/logos.png" alt="Logo" />
						</Link>
					</div>

					{/* Right Side */}
					<div className="navbar-logo-container d-flex align-items-center">
						{/* Cart */}
						<div className="cart-icon-wrap position-relative">
							<Link href="/cart">
								<i className="ti ti-basket-bolt"></i>
								{/* Show total items */}
								{totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
							</Link>
						</div>

						{/* Profile */}
						<div className="user-profile-icon ms-2">
							<Link href="/profile">
								<img src="/assets/img/core-img/avatar.jpg" alt="Profile" />
							</Link>
						</div>

						{/* Navbar Toggle */}
						<div
							className="suha-navbar-toggler ms-2"
							data-bs-toggle="offcanvas"
							data-bs-target="#suhaOffcanvas"
							aria-controls="suhaOffcanvas"
						>
							<div onClick={() => handleShow()}>
								<span></span>
								<span></span>
								<span></span>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Offcanvas Menu */}
			<Offcanvas handleShow={handleShow} show={show} />
		</>
	);
};

export default Header;
