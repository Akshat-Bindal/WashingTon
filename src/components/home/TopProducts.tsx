"use client";

import top_product from "@/data/top_product";
import Link from "next/link";
import React from "react";

import dynamic from "next/dynamic";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/features/cartSlice";

const MyTimer = dynamic(() => import("../common/Timer"), { ssr: false });

const TopProducts = () => {
  const dispatch = useDispatch();

  const handleAddToCart = (item: any) => {
    dispatch(addToCart(item));
  };

  return (
    <>
      <div className="top-products-area py-3">
        <div className="container">
          {/* Heading */}
          <div className="section-heading d-flex align-items-center justify-content-between dir-rtl">
            <h6>Top Products</h6>
            <Link className="btn btn-sm btn-light" href="/shop-grid">
              View all<i className="ms-1 ti ti-arrow-right"></i>
            </Link>
          </div>

          {/* Product Grid */}
          <div className="row g-2">
            {top_product.map((item, i) => (
              <div key={i} className="col-6 col-md-4">
                <div className="card product-card h-100">
                  <div className="card-body d-flex flex-column justify-content-between">
                    {/* Wishlist Button */}
                    <a className="wishlist-btn" href="#">
                      <i className="ti ti-heart"></i>
                    </a>

                    {/* Product Image */}
                    <div className="product-thumbnail d-block">
                      <img
                        className="mb-2 img-fluid"
                        src={item.img}
                        alt={item.title}
                      />
                      {/* Timer if needed */}
                      {/* {i === 0 || i === 3 ? (
                        <ul className="offer-countdown-timer d-flex align-items-center shadow-sm">
                          <MyTimer />
                        </ul>
                      ) : null} */}
                    </div>

                    {/* Product Title */}
                    <p className="product-title text-center min-h-[40px] flex items-center justify-center">
                      {item.title}
                    </p>

                    {/* Price */}
                    <p className="sale-price">
                      ₹ {item.new_price}
                      {/* <span>$ {item.old_price}</span> */}
                    </p>

                    {/* Add to Cart Button */}
                    <a
                      className="btn btn-primary btn-sm"
                      onClick={() => handleAddToCart(item)}
                      style={{ cursor: "pointer" }}
                    >
                      <i className="ti ti-plus"></i>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default TopProducts;
