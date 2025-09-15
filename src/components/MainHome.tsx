"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext"; // ✅ use auth context
import { useRouter } from "next/navigation";

const MainHome = () => {
  const { token } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(!show);

  // ✅ Mount check to avoid hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  // ✅ Redirect logged-in users away from landing page
  useEffect(() => {
    if (mounted && token) {
      // if token exists, redirect to last page or home
      const lastPage = localStorage.getItem("lastPage") || "/home";
      if (lastPage !== window.location.pathname) {
        router.push(lastPage);
      }
    }
  }, [mounted, token, router]);

  if (!mounted) return <p>Loading...</p>; // prevent flicker

  return (
    <>
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

      {/* Offcanvas logic */}
      {/* <Offcanvas handleShow={handleShow} show={show} /> */}
    </>
  );
};

export default MainHome;
