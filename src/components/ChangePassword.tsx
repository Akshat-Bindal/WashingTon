"use client";
import React, { useEffect, useState } from "react";
import Footer from "@/layouts/Footer";
import HeaderTwo from "@/layouts/HeaderTwo";
import { useSearchParams } from "next/navigation";

// ✅ UserInfoCard component (fetches name + image from localStorage)
const UserInfoCard = () => {
  const [name, setName] = useState<string>("Guest");

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    if (storedName) setName(storedName);
  }, []);

  return (
    <div className="card user-info-card">
      <div className="card-body p-4 d-flex align-items-center">
        <div className="user-profile me-3">
          <img
            src={"/assets/img/core-img/avatar.jpg"}
            alt="profile"
            style={{ borderRadius: "50%", width: "65px", height: "90px" }}
          />
        </div>
        <div className="user-info">
          <h5 className="mb-0 text-white">{name}</h5>
        </div>
      </div>
    </div>
  );
};

const ChangePassword = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setToken(params.get("token"));
    }
  }, []); // ✅ Extract token from URL

  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ✅ Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (!token) {
      setMessage("❌ Reset token not found in URL.");
      return;
    }

    if (newPassword.length < 8) {
      setMessage("❌ Password must be at least 8 characters long.");
      return;
    }

    if (newPassword !== repeatPassword) {
      setMessage("❌ Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `https://laundry-backend-fg99.onrender.com/api/auth/reset-password/${token}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ newPassword }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setMessage(`❌ ${data.message || "Something went wrong"}`);
      } else {
        setMessage("✅ Password updated successfully! You can now login.");
      }
    } catch (err: any) {
      setMessage(`❌ ${err.message || "Server error"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ✅ Page Header */}
      <HeaderTwo links="settings" title="Change Password" />

      <div className="page-content-wrapper">
        <div className="container">
          <div className="profile-wrapper-area py-3">

            {/* ✅ User Info Card */}
            <UserInfoCard />

            {/* ✅ Password Reset Form */}
            <div className="card user-data-card">
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  {/* New Password */}
                  <div className="mb-3">
                    <div className="title mb-2">
                      <i className="ti ti-key"></i>
                      <span>New Password</span>
                    </div>
                    <input
                      className="form-control"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                  </div>

                  {/* Repeat Password */}
                  <div className="mb-3">
                    <div className="title mb-2">
                      <i className="ti ti-key"></i>
                      <span>Repeat New Password</span>
                    </div>
                    <input
                      className="form-control"
                      type="password"
                      value={repeatPassword}
                      onChange={(e) => setRepeatPassword(e.target.value)}
                      required
                    />
                  </div>

                  {/* Show error/success message */}
                  {message && (
                    <p
                      className={
                        message.startsWith("✅")
                          ? "text-success"
                          : "text-danger"
                      }
                    >
                      {message}
                    </p>
                  )}

                  {/* Submit Button */}
                  <button
                    className="btn btn-primary btn-lg w-100"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Updating..." : "Update Password"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Footer + Connection Status */}
      <div className="internet-connection-status" id="internetStatus"></div>
      <Footer />
    </>
  );
};

export default ChangePassword;
