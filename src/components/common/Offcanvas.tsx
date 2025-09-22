"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";

const Offcanvas = ({ handleShow, show }: any) => {
	const router = useRouter();

	const handleLogout = () => {
		localStorage.removeItem("token");
		router.replace("/intro");
	};

	return (
		<>
			<div
				className={`offcanvas offcanvas-start suha-offcanvas-wrap ${show ? "show" : ""
					}`}
				tabIndex={-1}
				id="suhaOffcanvas"
				aria-labelledby="suhaOffcanvasLabel"
			>
				<button
					onClick={handleShow}
					className="btn-close btn-close-white"
					type="button"
				></button>

				<div className="offcanvas-body">
					<ul className="sidenav-nav ps-0">
						<li>
							<Link href="/profile">
								<i className="ti ti-user"></i>My Profile
							</Link>
						</li>
						<li>
							<Link href="/my-order">
								<i className="ti ti-notebook"></i>My Order
							</Link>
						</li>
						<li>
							<Link href="/pages">
								<i className="ti ti-notebook"></i>All Pages
							</Link>
						</li>
						<li>
							<Link href="/settings">
								<i className="ti ti-adjustments-horizontal"></i>Settings
							</Link>
						</li>
						<li>
					
							<a
								onClick={handleLogout}
								className="text-white"  
								style={{ cursor: "pointer" }}
							>
								<i className="ti ti-logout"></i>Sign Out
							</a>
						</li>
					</ul>
				</div>
			</div>
		</>
	);
};

export default Offcanvas;
