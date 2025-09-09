"use client";
import Footer from "@/layouts/Footer";
import Header from "@/layouts/Header";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { fetchWithAuth } from "@/utils/api";

interface User {
  username: string;
  fullName: string;
  phone: string;
  email: string;
  address: string;
}

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await fetchWithAuth(
          "/api/users/me",
          {},
          true
        );
        setUser({
          username: data.username,
          fullName: data.name,
          phone: data.phone,
          email: data.email,
          address: data.addresses?.[0] || "Not provided",
        });
      } catch (err) {
        if (err instanceof Error) setError(err.message);
        else setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  if (loading) {
    return (
      <>
        <Header />
        <div className="text-center mt-5">Loading profile...</div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="text-center mt-5 text-danger">{error}</div>
        <Footer />
      </>
    );
  }

  if (!user) {
    return (
      <>
        <Header />
        <div className="text-center mt-5">No profile data found</div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="page-content-wrapper">
        <div className="container">
          <div className="profile-wrapper-area py-3">
            <div className="card user-info-card">
              <div className="card-body p-4 d-flex align-items-center">
                <div className="user-profile me-3">
                <Image
					src="/assets/img/core-img/avatar.jpg"
					alt="avatar"
					width={60}
					height={60}
					className="rounded-circle"
				/>
                </div>
                <div className="user-info">
                  <h5 className="mb-0 text-white">{user.fullName}</h5>
                </div>
              </div>
            </div>

            <div className="card user-data-card">
              <div className="card-body">
                <div className="single-profile-data d-flex align-items-center justify-content-between">
                  <div className="title d-flex align-items-center">
                    <i className="ti ti-user"></i>
                    <span>Full Name</span>
                  </div>
                  <div className="data-content">{user.fullName}</div>
                </div>
                <div className="single-profile-data d-flex align-items-center justify-content-between">
                  <div className="title d-flex align-items-center">
                    <i className="ti ti-phone"></i>
                    <span>Phone</span>
                  </div>
                  <div className="data-content">{user.phone}</div>
                </div>
                <div className="single-profile-data d-flex align-items-center justify-content-between">
                  <div className="title d-flex align-items-center">
                    <i className="ti ti-mail"></i>
                    <span>Email</span>
                  </div>
                  <div className="data-content">{user.email}</div>
                </div>
                <div className="single-profile-data d-flex align-items-center justify-content-between">
                  <div className="title d-flex align-items-center">
                    <i className="ti ti-location-pin"></i>
                    <span>Shipping:</span>
                  </div>
                  <div className="data-content">{user.address}</div>
                </div>
                <div className="single-profile-data d-flex align-items-center justify-content-between">
                  <div className="title d-flex align-items-center">
                    <i className="ti ti-star-filled"></i>
                    <span>My Orders</span>
                  </div>
                  <div className="data-content">
                    <Link className="btn btn-primary btn-sm" href="/my-order">
                      View Status
                    </Link>
                  </div>
                </div>

                <div className="edit-profile-btn mt-3">
                  <Link
                    className="btn btn-primary btn-lg w-100"
                    href="/edit-profile"
                  >
                    <i className="ti ti-pencil me-2"></i>Edit Profile
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Profile;
