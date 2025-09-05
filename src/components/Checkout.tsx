"use client";
import Footer from "@/layouts/Footer";
import HeaderTwo from "@/layouts/HeaderTwo";
import Link from "next/link";
import React, { useState } from "react";
import Count from "./common/Count";
import UseCartInfo from "@/hooks/UseCartInfo";

const Checkout = () => {
  const { total } = UseCartInfo();
  const [laundryType, setLaundryType] = useState("sameDay");
  const [extraCharge, setExtraCharge] = useState(50); // default to Same Day
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Calculate final total
  const finalTotal = total + extraCharge;

  const handleLaundryChange = (type: string, charge: number) => {
    setLaundryType(type);
    setExtraCharge(charge);
  };

  const handleConfirmOrder = () => {
    // Save order data (mock, can be replaced with API call or localStorage)
    const orderData = {
      name: "SUHA JANNAT",
      email: "care@example.com",
      phone: "+880 000 111 222",
      address: "28/C Green Road, BD",
      laundryType,
      extraCharge,
      total: finalTotal,
    };

    localStorage.setItem("latestOrder", JSON.stringify(orderData));

    // Show success message
    setOrderPlaced(true);

    // Auto hide notification
    setTimeout(() => {
      setOrderPlaced(false);
    }, 4000);
  };

  return (
    <>
      <HeaderTwo links="cart" title="Billing Information" />

      <div className="page-content-wrapper">
        <div className="container">
          <div className="checkout-wrapper-area py-3">

            {/* Billing Info */}
            <div className="billing-information-card mb-3">
              <div className="card billing-information-title-card">
                <div className="card-body">
                  <h6 className="text-center mb-0">Billing Information</h6>
                </div>
              </div>

              <div className="card user-data-card">
                <div className="card-body">
                  <div className="single-profile-data d-flex align-items-center justify-content-between">
                    <div className="title d-flex align-items-center">
                      <i className="ti ti-user"></i> <span>Full Name</span>
                    </div>
                    <div className="data-content">SUHA JANNAT</div>
                  </div>

                  <div className="single-profile-data d-flex align-items-center justify-content-between">
                    <div className="title d-flex align-items-center">
                      <i className="ti ti-mail"></i> <span>Email Address</span>
                    </div>
                    <div className="data-content">care@example.com</div>
                  </div>

                  <div className="single-profile-data d-flex align-items-center justify-content-between">
                    <div className="title d-flex align-items-center">
                      <i className="ti ti-phone"></i> <span>Phone</span>
                    </div>
                    <div className="data-content">+880 000 111 222</div>
                  </div>

                  <div className="single-profile-data d-flex align-items-center justify-content-between">
                    <div className="title d-flex align-items-center">
                      <i className="ti ti-ship"></i> <span>Shipping:</span>
                    </div>
                    <div className="data-content">28/C Green Road, BD</div>
                  </div>

                  {/* Buttons */}
                  <div className="d-grid gap-2 mt-3">
                    <Link className="btn btn-primary w-100" href="/edit-profile">
                      Edit Billing Information
                    </Link>
                    <Link className="btn btn-outline-primary w-100" href="/other-address">
                      Use Other Address
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Laundry Type */}
            <div className="shipping-method-choose mb-3">
              <div className="card shipping-method-choose-title-card">
                <div className="card-body">
                  <h6 className="text-center mb-0">Laundry Type</h6>
                </div>
              </div>

              <div className="card shipping-method-choose-card">
                <div className="card-body">
                  <div className="shipping-method-choose">
                    <ul className="ps-0">
                      <li>
                        <input
                          id="sameDay"
                          type="radio"
                          name="laundryType"
                          checked={laundryType === "sameDay"}
                          onChange={() => handleLaundryChange("sameDay", 50)}
                        />
                        <label htmlFor="sameDay">
                          Same Day Delivery <span>₹50 extra</span>
                        </label>
                        <div className="check"></div>
                      </li>
                      <li>
                        <input
                          id="nextDay"
                          type="radio"
                          name="laundryType"
                          checked={laundryType === "nextDay"}
                          onChange={() => handleLaundryChange("nextDay", 30)}
                        />
                        <label htmlFor="nextDay">
                          Next Day Delivery <span>₹30 extra</span>
                        </label>
                        <div className="check"></div>
                      </li>
                      <li>
                        <input
                          id="regularLaundry"
                          type="radio"
                          name="laundryType"
                          checked={laundryType === "regularLaundry"}
                          onChange={() => handleLaundryChange("regularLaundry", 0)}
                        />
                        <label htmlFor="regularLaundry">
                          Regular <span>3-5 days (Free)</span>
                        </label>
                        <div className="check"></div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Total & Pay */}
            <div className="card cart-amount-area">
              <div className="card-body d-flex align-items-center justify-content-between">
                <h5 className="total-price mb-0">
                  ₹ <span className="counter">
                    <Count number={finalTotal} />
                  </span>
                </h5>
                <button className="btn btn-primary" onClick={handleConfirmOrder}>
                  Confirm Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Order success notification */}
      {orderPlaced && (
        <div
          className="toast shadow bg-success text-white position-fixed bottom-0 end-0 m-3 p-3"
          style={{ zIndex: 9999 }}
        >
          ✅ Your order has been placed successfully!
        </div>
      )}

      <div className="internet-connection-status" id="internetStatus"></div>
      <Footer />
    </>
  );
};

export default Checkout;
