

import Footer from "@/layouts/Footer";
import Header from "@/layouts/Header";
import Link from "next/link";
import React from "react";





const Pages = () => {
  return (
    <>
      <Header />
      <div className="page-content-wrapper py-3">
        <div className="container">
          <ul className="page-nav ps-0">
{/* 
            <li><Link href="/home">Home<i className="ti ti-arrow-right"></i></Link></li> */}
            {/* <li><Link href="/intro">Intro/Flash Screen<i className="ti ti-arrow-right"></i></Link></li> */}

            <li className="nav-title">Services</li>
            <li><Link href="/shop-grid">Dry Clean Items<i className="ti ti-arrow-right"></i></Link></li>
           

{/* 
            <li className="nav-title">Vendor</li>
            <li><Link href="/vendors">Vendors<i className="ti ti-arrow-right"></i></Link></li>
            <li><Link href="/vendor-shop">Vendor Shop<i className="ti ti-arrow-right"></i></Link></li>
            <li><Link href="/become-vendor">Become A Vendor<i className="ti ti-arrow-right"></i></Link></li> */}

            <li className="nav-title">Payment Page</li>
           
            <li><Link href="/payment-success">Payment QR Code<i className="ti ti-arrow-right"></i></Link></li>

            <li className="nav-title">User Page</li>
            <li><Link href="/login">Login<i className="ti ti-arrow-right"></i></Link></li>
            <li><Link href="/register">Register<i className="ti ti-arrow-right"></i></Link></li>
            
          
            <li><Link href="/change-password">Change Password<i className="ti ti-arrow-right"></i></Link></li>
           


            
           

            <li className="nav-title">Others</li>
          
            <li><Link href="/about-us">About Us<i className="ti ti-arrow-right"></i></Link></li>
            <li><Link href="/contact">Contact Us<i className="ti ti-arrow-right"></i></Link></li>
            
            <li><Link href="/privacy-policy">Privacy Policy<i className="ti ti-arrow-right"></i></Link></li>
              
            
          </ul>
        </div>
      </div>

      <div className="internet-connection-status" id="internetStatus"></div>

      <Footer />

    </>
  );
};

export default Pages;