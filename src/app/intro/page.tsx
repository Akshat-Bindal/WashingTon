"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const IntroPage = () => {
  const router = useRouter();
  const [checking, setChecking] = useState(true); // show nothing while checking
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      // ✅ here you can also call an API to verify token if needed
      setHasToken(true);
      router.replace("/home");
    } else {
      setHasToken(false);
    }
    setChecking(false);
  }, [router]);

  if (checking) return null; // ⏳ nothing until check finishes

  return (
    <div className="intro-wrapper d-flex align-items-center justify-content-center text-center">
      <div className="container">
        <img
          className="big-logo"
          src="/assets/img/core-img/logO1.png"
          alt="WashingTons Laundry"
        />

        <div className="mt-4">
          <h2 className="text-white mb-3">Welcome to Washing Tons</h2>
          {/* <p className="text-white-50 mb-4">
            Your premium laundry service solution
          </p> */}
        </div>

        {/* Show Login only if no token */}
        {!hasToken && (
          <div className="get-started-options px-3">
            <Link
              className="btn btn-warning btn-lg w-50 mb-3"
              href="/login"
            >
              <i className="ti ti-login me-2"></i>
              Login to Continue
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default IntroPage;
