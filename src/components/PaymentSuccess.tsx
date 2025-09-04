"use client";

import Link from "next/link";
import React from "react";

const PaymentSuccess = () => {
  const qrImagePath = "/assets/img/payment.png";
  const upiId = "9116780940@ybl";

  const copyUPI = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(upiId);
      alert("UPI ID copied to clipboard! ✅");
    }
  };

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center bg-dark">
      <div className="card shadow-lg border-0 rounded-4 p-4 text-center" style={{ maxWidth: "350px", width: "100%" }}>
        
        {/* Title */}
        <h5 className="fw-bold mb-2">Payment</h5>
        <p className=" text-white-50 text-muted small mb-3">
          Check your bill and pay securely via QR code or UPI ID.
        </p>

        {/* QR Section */}
        <div className="bg-light rounded-3 p-3 mb-3">
          <p className="fw-semibold mb-2">Scan & Pay</p>
          <img
            src={qrImagePath}
            alt="Payment QR Code"
            className="img-fluid mx-auto d-block"
            style={{ maxWidth: "180px" }}
          />
          

          <a
            href={qrImagePath}
            download="payment-qr.jpg"
            className="btn btn-outline-primary btn-sm mt-2 w-100"
          >
            <i className="ti ti-download pe-1"></i> Download QR
          </a>
        </div>

        {/* UPI Section */}
        <div className="mb-3">
          <p className="fw-semibold mb-1">Pay via UPI</p>
          <p className="text-primary fw-bold">{upiId}</p>
          <button
            onClick={copyUPI}
            className="btn btn-outline-secondary btn-sm w-100"
          >
            <i className="ti ti-copy pe-1"></i> Copy UPI ID
          </button>
        </div>

        {/* Back Button */}
        <Link href="/home" className="btn btn-primary w-100">
          <i className="ti ti-arrow-left pe-2"></i> Back to Home
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
