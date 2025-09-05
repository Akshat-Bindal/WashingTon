"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Register = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");
  const router = useRouter(); // ✅ Next.js router

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let isValid = true;

    // ✅ Password length check
    if (password.length < 8) {
      setPasswordError("❌ Password must be at least 8 characters long.");
      isValid = false;
    } else {
      setPasswordError("");
    }

    // ✅ Confirm password check
    if (password !== confirmPassword) {
      setConfirmError("❌ Passwords do not match.");
      isValid = false;
    } else {
      setConfirmError("");
    }

    if (!isValid) return;

    // ✅ Redirect to OtpConfirm page
    router.push("/otp-confirm");
  };

  return (
    <>
      <div className="login-wrapper d-flex align-items-center justify-content-center text-center">
        <div className="background-shape"></div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-10 col-lg-8">
              <h2 className="text-white fw-bold">WASHING TONS</h2>
              <h6 className="text-white fw-bold">User Registration</h6>

              <div className="register-form mt-5">
                <form onSubmit={handleSubmit}>
                  {/* Full Name */}
                  <div className="form-group text-start mb-4">
                    <span>Full Name</span>
                    <label htmlFor="name">
                      <i className="ti ti-user"></i>
                    </label>
                    <input
                      className="form-control"
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  {/* Contact */}
                  <div className="form-group text-start mb-4">
                    <span>Contact Number</span>
                    <label htmlFor="contact">
                      <i className="ti ti-phone"></i>
                    </label>
                    <input
                      className="form-control"
                      id="contact"
                      type="tel"
                      placeholder="Enter your contact number"
                      required
                    />
                  </div>

                  {/* Address */}
                  <div className="form-group text-start mb-4">
                    <span>Address</span>
                    <label htmlFor="address">
                      <i className="ti ti-map-pin"></i>
                    </label>
                    <input
                      className="form-control"
                      id="address"
                      type="text"
                      placeholder="Enter your address"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div className="form-group text-start mb-4">
                    <span>Email</span>
                    <label htmlFor="email">
                      <i className="ti ti-at"></i>
                    </label>
                    <input
                      className="form-control"
                      id="email"
                      type="email"
                      placeholder="help@example.com"
                      required
                    />
                  </div>

                  {/* Password */}
                  <div className="form-group text-start mb-2">
                    <span>Password</span>
                    <label htmlFor="password">
                      <i className="ti ti-key"></i>
                    </label>
                    <input
                      className="form-control"
                      id="password"
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  {passwordError && (
                    <p className="text-danger small mt-1">{passwordError}</p>
                  )}

                  {/* Confirm Password */}
                  <div className="form-group text-start mb-2">
                    <span>Confirm Password</span>
                    <label htmlFor="confirmPassword">
                      <i className="ti ti-lock"></i>
                    </label>
                    <input
                      className="form-control"
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                  {confirmError && (
                    <p className="text-danger small mt-1">{confirmError}</p>
                  )}

                  {/* Submit */}
                  <button
                    className="btn btn-warning btn-lg w-100 mt-3"
                    type="submit"
                  >
                    Sign Up
                  </button>
                </form>
              </div>

              <div className="login-meta-data">
                <p className="mt-3 mb-0">
                  Already have an account?
                  <Link className="mx-1" href="/login">
                    Sign In
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
