"use client";

import { useState, useEffect, ChangeEvent, KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import { fetchWithAuth } from "@/utils/api";

const OtpConfirm = () => {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [notification, setNotification] = useState<string>("");
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setEmail(params.get("email"));
    }
  }, []);
 // ✅ email passed from register

  const handleChange = (element: HTMLInputElement, index: number) => {
    const value = element.value.replace(/[^0-9]/g, "");
    if (value.length === 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (index < otp.length - 1) {
        const nextElement = document.getElementById(
          `otp-input-${index + 1}`
        ) as HTMLInputElement;
        nextElement?.focus();
      }
    }
  };

  const handleBackspace = (
    e: KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && otp[index] === "") {
      if (index > 0) {
        const prevElement = document.getElementById(
          `otp-input-${index - 1}`
        ) as HTMLInputElement;
        prevElement?.focus();
      }
    }
  };

  // ✅ Verify OTP with backend
  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const code = otp.join("");
      await fetchWithAuth("api/auth/verify-email", {
        method: "POST",
        body: JSON.stringify({ email, otp: code }),
      });
      setNotification("✅ OTP verified successfully!");
      setTimeout(() => router.push("/login"), 1500);
    } catch (err) {
      if (err instanceof Error) {
        setNotification(`❌ ${err.message}`);
      } else {
        setNotification("❌ Verification failed");
      }
    }
  };

  // ✅ Resend OTP
  const handleResendOTP = async () => {
    try {
      await fetchWithAuth("api/auth/resend-otp", {
        method: "POST",
        body: JSON.stringify({ email }),
      });
      setNotification("OTP resent successfully ✅");
      setTimeout(() => setNotification(""), 3000);
    } catch (err) {
      setNotification("❌ Failed to resend OTP");
    }
  };

  return (
    <div className="login-wrapper d-flex align-items-center justify-content-center text-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-10 col-lg-8">
            <div className="text-start rtl-text-right">
              <h5 className="mb-1 text-white">Verify OTP</h5>
              <p className="mb-4 text-white">
                Enter the OTP sent to <span className="mx-1">{email}</span>
              </p>
            </div>

            <div className="otp-verify-form mt-5">
              <form onSubmit={handleVerify}>
                <div className="d-flex justify-content-between mb-5 rtl-flex-d-row-r">
                  {otp.map((data, index) => (
                    <input
                      key={index}
                      id={`otp-input-${index}`}
                      className="single-otp-input form-control text-center"
                      type="text"
                      value={data}
                      placeholder="-"
                      maxLength={1}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        handleChange(e.target, index)
                      }
                      onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
                        handleBackspace(e, index)
                      }
                    />
                  ))}
                </div>
                <button
                  className="btn btn-warning btn-lg w-100"
                  type="submit"
                >
                  Verify & Proceed
                </button>
              </form>
            </div>

            <div className="login-meta-data mt-3 text-center">
              <p className="mb-2">
                Didn’t receive the OTP?
                <button
                  type="button"
                  className="btn btn-link p-0 mx-1 text-warning fw-bold"
                  onClick={handleResendOTP}
                >
                  Resend OTP
                </button>
              </p>
              <button
                type="button"
                className="btn btn-outline-light btn-sm mt-2"
                onClick={() => router.back()}
              >
                ⬅ Back
              </button>
            </div>

            {notification && (
              <div className="alert alert-info mt-3 p-2 small">
                {notification}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpConfirm;
