"use client";

import Link from "next/link";
import React, { useState } from "react";
import Offcanvas from "./common/Offcanvas";

const MainHome = () => {
	const [show, setShow] = useState(false);
	const handleShow = () => setShow(!show);

	return (
		<>
			<div className="preview-iframe-wrapper">
				{/* <div
					className="header-area shadow-none"
					id="headerArea"
				> */}
					
					{/* <div className="container demo-container">
						
						<div className="navbar-logo-container">
							<div
								className=""
								data-bs-toggle="offcanvas"
								data-bs-target="#suhaOffcanvas"
								aria-controls="suhaOffcanvas"
							>
								
							</div>
						</div>
					</div> */}
				{/* </div> */}
				<div className="preview-hero-area h-full w-full">
					<div className="container demo-container w-full h-full">
						<div className="row">
							<div className="col-12 col-lg-5 col-xl-3">
								
								<div className="qr-code-wrapper shadow-sm d-none d-lg-block d-xl-none mt-5">
									
									
								</div>
							</div>
							<div className="col-12 col-lg-6 col-xl-5">
								<div className="w-full">
									<iframe src="/intro"></iframe>
								</div>
								
							</div>
						</div>
					</div>
				</div>

				

				
			</div>

			{/* <Offcanvas handleShow={handleShow} show={show} /> */}
		</>
	);
};

export default MainHome;
