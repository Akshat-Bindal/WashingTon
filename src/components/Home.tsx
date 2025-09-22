import React from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import Footer from "@/layouts/Footer";
import Header from "@/layouts/Header";
import Alert from "./common/Alert";
import CtaArea from "./home/CtaArea";
import FlashSale from "./home/FlashSale";
import HeroSlider from "./home/HeroSlider";
import DiscountCouponCard from "./home/DiscountCouponCard";
import DarkLight from "./common/DarkLight";
import TopProducts from "./home/TopProducts";
import ProductCatagories from "./home/ProductCatagories";
import Collections from "./home/Collections";
import { ToastContainer } from "react-toastify";

const Home = () => {
  const { token, setToken } = useAuth();
  const searchParams = useSearchParams();
  const isGuestMode = searchParams?.get("guest") === "true";

  const handleLogout = () => {
    setToken(null);
    window.location.href = "/intro";
  };

  return (
    <>
      <Header />
      
      {/* Auth Status Bar */}
      {(token || isGuestMode) && (
        <div className="auth-status-bar bg-light border-bottom py-2">
          <div className="container d-flex justify-content-between align-items-center">
            <div>
              {token && !isGuestMode ? (
                <span className="text-success small">
                  <i className="ti ti-check-circle me-1"></i>
                  Authenticated User
                </span>
              ) : isGuestMode ? (
                <span className="text-info small">
                  <i className="ti ti-eye me-1"></i>
                  Guest Mode - Limited Access
                </span>
              ) : null}
            </div>
            
            <div>
              {token && !isGuestMode ? (
                <button 
                  className="btn btn-outline-danger btn-sm"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              ) : isGuestMode ? (
                <div>
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
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}

      <Alert />
      <div className="page-content-wrapper">
        <HeroSlider />
        <ProductCatagories />
        <FlashSale />
        <DiscountCouponCard />
        <DarkLight />
        <TopProducts />
        <CtaArea />
        <Collections />
      </div>
      <Footer />
      <ToastContainer position="top-right" />
    </>
  );
};

export default Home;