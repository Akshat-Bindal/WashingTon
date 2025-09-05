"use client";
import Footer from "@/layouts/Footer";
import HeaderTwo from "@/layouts/HeaderTwo";
import Link from "next/link";
import React, { useState } from "react";

const OtherAddress = () => {
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSave = () => {
    if (!address || !contact || !password || !confirmPassword) {
      alert("⚠️ Please fill in all fields before saving.");
      return;
    }

    if (password !== confirmPassword) {
      alert("❌ Password and Confirm Password do not match.");
      return;
    }

    alert(`✅ Other Address Saved:
${address}
Contact: ${contact}
Password: ${password}`);
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

                {/* Address */}
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

                {/* Contact */}
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

                {/* Password */}
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                {/* Confirm Password */}
                <div className="mb-3">
                  <label className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Re-enter password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>

                {/* Buttons */}
                <div className="d-grid gap-2">
                  <button
                    onClick={handleSave}
                    className="btn btn-primary w-100"
                  >
                    Save Address
                  </button>
                  <Link
                    href="/checkout"
                    className="btn btn-outline-primary w-100"
                  >
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
