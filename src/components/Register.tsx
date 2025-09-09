"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { fetchWithAuth } from "@/utils/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let isValid = true;

    if (password.length < 8) {
      setPasswordError("❌ Password must be at least 8 characters long.");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (password !== confirmPassword) {
      setConfirmError("❌ Passwords do not match.");
      isValid = false;
    } else {
      setConfirmError("");
    }

    if (!isValid) return;

    setLoading(true);

    try {
      await fetchWithAuth("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({
        name,
        email,
        phone,
        password,
        addresses: [address],
        }),
      });

      toast.success("🎉 Registration successful! Please verify OTP.", {
        position: "top-center",
        autoClose: 2000,
      });

      // Pass email in query string so OTP page knows who to verify
      setTimeout(() => {
        router.push(`/otp-confirm?email=${encodeURIComponent(email)}`);
      }, 2200);
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message, { position: "top-center" });
      } else {
        toast.error("Something went wrong", { position: "top-center" });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="login-wrapper d-flex align-items-center justify-content-center text-center">
        <div className="background-shape"></div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-10 col-lg-8">
              <h2 className="text-white fw-bold">WASHING TONS</h2>
              <h6 className="text-white fw-bold">User Registration</h6>

              <div className="register-form mt-5">
                <form onSubmit={handleSubmit}>
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
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>

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
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>

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
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                    />
                  </div>

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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

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

                  <button
                    className="btn btn-warning btn-lg w-100 mt-3"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Signing Up..." : "Sign Up"}
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
