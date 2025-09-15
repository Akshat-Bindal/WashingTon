"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgetPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(
        "https://laundry-backend-fg99.onrender.com/api/auth/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      toast.success("Password reset link sent to your email! 📧");
      router.push("/forget-password-success");
    } catch (err: any) {
      toast.error(err.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper d-flex align-items-center justify-content-center text-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-10 col-lg-8">
            <Image
              className="big-logo"
              src="/assets/img/core-img/logo2.png"
              alt="App Logo"
              width={100}
              height={100}
            />

            <div className="register-form mt-5">
              <form onSubmit={handleSubmit}>
                <div className="form-group text-start mb-4">
                  <span>Email</span>
                  <label htmlFor="email">
                    <i className="ti ti-user"></i>
                  </label>
                  <input
                    className="form-control"
                    id="email"
                    type="email"
                    placeholder="info@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <button
                  className="btn btn-warning btn-lg w-100"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Reset Password"}
                </button>
              </form>

              {/* ✅ Back Button */}
              <div className="mt-3 text-center">
                <button
                  type="button"
                  className="btn btn-outline-light btn-sm"
                  onClick={() => router.back()}
                >
                  ⬅ Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
