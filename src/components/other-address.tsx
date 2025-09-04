"use client";
import Footer from "@/layouts/Footer";
import HeaderTwo from "@/layouts/HeaderTwo";
import Link from "next/link";
import React, { useState } from "react";

const OtherAddress = () => {
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");

  const handleSave = () => {
    if (!address || !contact) {
      alert("Please fill in both fields before saving.");
      return;
    }
    alert(`Other Address Saved:\n${address}\nContact: ${contact}`);
  };

  return (
    <>
      <HeaderTwo links="checkout" title="Other Address" />

      <div className="page-content-wrapper">
        <div className="container">
          <div className="checkout-wrapper-area py-3">

            {/* Address Form */}
            <div className="card mb-3">
              <div className="card-body">
                <h6 className="text-center mb-3">Enter Other Address</h6>

                <div className="mb-3">
                  <label className="form-label">Address</label>
                  <textarea
                    className="form-control"
                    placeholder="Enter full address"
                    rows={3}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label className="form-label">Contact Number</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter contact number"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                  />
                </div>

                <div className="d-grid gap-2">
                  <button onClick={handleSave} className="btn btn-primary w-100">
                    Save Address
                  </button>
                  <Link href="/checkout" className="btn btn-outline-primary w-100">
                    Back to Checkout
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="internet-connection-status" id="internetStatus"></div>
      <Footer />
    </>
  );
};

export default OtherAddress;
