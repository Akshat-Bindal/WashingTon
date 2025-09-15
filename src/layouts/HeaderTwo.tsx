"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Offcanvas from "@/components/common/Offcanvas";

const HeaderTwo = ({ links, title }: any) => {
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
        <div className="container h-100 d-flex align-items-center justify-content-between rtl-flex-d-row-r">
          
          {/* Back Button */}
          <div className="back-button me-2">
            <Link href={`/${links}`}>
              <i className="ti ti-arrow-left"></i>
            </Link>
          </div>

          {/* Page Title */}
          <div className="page-heading">
            <h6 className="mb-0">{title}</h6>
          </div>

          {/* Right Side: Cart + Profile + Offcanvas */}
          <div className="navbar-logo-container d-flex align-items-center">
            {/* Cart */}
            <div className="cart-icon-wrap position-relative me-2">
              <Link href="/cart">
                <i className="ti ti-basket-bolt"></i>
                {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
              </Link>
            </div>

            {/* Profile */}
            <div className="user-profile-icon me-2">
              <Link href="/profile">
                <img src="/assets/img/core-img/avatar.jpg" alt="Profile" />
              </Link>
            </div>

            {/* Offcanvas Toggle */}
            <div
              className="suha-navbar-toggler"
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

export default HeaderTwo;
