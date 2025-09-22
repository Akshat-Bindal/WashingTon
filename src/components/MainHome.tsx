"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";

const MainHome = () => {
  const { token, setToken } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [show, setShow] = useState(false);
  const [mounted, setMounted] = useState(false);

  const isGuestMode = searchParams.get("guest") === "true";

  const handleShow = () => setShow(!show);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle logout
  const handleLogout = () => {
    setToken(null);
    router.push("/?logout=true");
  };

  // Handle login redirect
  const handleLogin = () => {
    router.push("/login");
  };

  if (!mounted) return <div>Loading...</div>;

  return (
    <>
      {/* Auth Status Bar */}
      <div className="auth-status-bar bg-light border-bottom py-2">
        <div className="container d-flex justify-content-between align-items-center">
          <div>
            {token && !isGuestMode ? (
              <span className="text-success">
                <i className="ti ti-check-circle me-1"></i>
                Logged in as authenticated user
              </span>
            ) : isGuestMode ? (
              <span className="text-info">
                <i className="ti ti-eye me-1"></i>
                Viewing as guest
              </span>
            ) : (
              <span className="text-muted">
                <i className="ti ti-user me-1"></i>
                Not logged in
              </span>
            )}
          </div>
          
          <div>
            {token && !isGuestMode ? (
              <>
                <span className="me-3 text-muted">Welcome!</span>
                <button 
                  className="btn btn-outline-secondary btn-sm me-2"
                  onClick={() => router.push("/home?guest=true")}
                >
                  Switch to Guest View
                </button>
                <button 
                  className="btn btn-outline-danger btn-sm"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : isGuestMode ? (
              <>
                <button 
                  className="btn btn-primary btn-sm me-2"
                  onClick={handleLogin}
                >
                  Login for Full Access
                </button>
                <Link 
                  className="btn btn-outline-primary btn-sm"
                  href="/register"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <Link 
                  className="btn btn-primary btn-sm me-2"
                  href="/login"
                >
                  Login
                </Link>
                <Link 
                  className="btn btn-outline-primary btn-sm"
                  href="/register"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="preview-iframe-wrapper">
        <div className="preview-hero-area h-full w-full">
          <div className="container demo-container w-full h-full">
            <div className="row">
              <div className="col-12 col-lg-5 col-xl-3">
                <div className="qr-code-wrapper shadow-sm d-none d-lg-block d-xl-none mt-5">
                  {/* QR code or additional content here */}
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

      {/* Feature Access Notice */}
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            {isGuestMode ? (
              <div className="alert alert-info">
                <h6 className="alert-heading">Guest Mode</h6>
                <p className="mb-2">You&apos;re viewing with limited access. Some features may be restricted.</p>
                <hr />
                <p className="mb-0">
                  <Link href="/login" className="btn btn-primary btn-sm">
                    Login
                  </Link>
                  {" "}or{" "}
                  <Link href="/register" className="btn btn-outline-primary btn-sm">
                    Create Account
                  </Link>
                  {" "}for full access to all features.
                </p>
              </div>
            ) : token ? (
              <div className="alert alert-success">
                <h6 className="alert-heading">Welcome Back!</h6>
                <p className="mb-0">You have full access to all features and personalized content.</p>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* Offcanvas logic */}
      {/* <Offcanvas handleShow={handleShow} show={show} /> */}
    </>
  );
};

export default MainHome;