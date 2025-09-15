"use client";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const router = useRouter();
  const { setToken } = useAuth(); // ✅ use setter
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        "https://laundry-backend-fg99.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Invalid credentials");

      // ✅ Save token in context & localStorage
      setToken(data.token);

      toast.success("Login successful! 🎉", { position: "top-right" });

      router.push("/home"); // ✅ redirect after login
    } catch (err: any) {
      toast.error(err.message || "Something went wrong", { position: "top-right" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper d-flex align-items-center justify-content-center text-center">
      <div className="background-shape"></div>
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
              <form onSubmit={handleLogin}>
                <div className="form-group text-start mb-4">
                  <span>Email</span>
                  <label htmlFor="username">
                    <i className="ti ti-user"></i>
                  </label>
                  <input
                    className="form-control"
                    id="username"
                    type="email"
                    placeholder="info@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group text-start mb-4">
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

                <button
                  className="btn btn-warning btn-lg w-100"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Log In"}
                </button>
              </form>
            </div>

            <div className="login-meta-data">
              <Link className="forgot-password d-block mt-3 mb-1" href="/forget-password">
                Forgot Password?
              </Link>
              <p className="mb-0">
                Didn’t have an account?
                <Link className="mx-1" href="/register">
                  Register Now
                </Link>
              </p>
            </div>

            <div className="view-as-guest mt-3">
              <Link className="btn btn-primary btn-sm" href="/home">
                View as guest<i className="ps-2 ti ti-arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
