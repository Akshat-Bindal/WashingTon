"use client";
import React from "react";
import top_products from "@/data/top_products.json"; // ✅ JSON import
import Link from "next/link";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/features/cartSlice";

interface TopProductItem {
  _id: { $oid: string };
  name: string;
  price: number;
  imageUrl: string;
}

const TopProducts = () => {
  const dispatch = useDispatch();

  const handleAddToCart = (item: TopProductItem) => {
    const productData = {
      service: item._id.$oid, // ✅ MongoDB service ID
      img: item.imageUrl || "/assets/img/core-img/avatar.png",
      title: item.name,
      price: Number(item.price) || 0,
      quantity: 1,
    };
    dispatch(addToCart(productData));
  };

  return (
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
          {top_products.map((item: TopProductItem, i: number) => (
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
                      src={item.imageUrl}
                      alt={item.name}
                    />
                  </div>

                  {/* Product Title */}
                  <p className="product-title text-center min-h-[40px] flex items-center justify-center">
                    {item.name}
                  </p>

                  {/* Price */}
                  <p className="sale-price">₹ {Number(item.price) || 0}</p>

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
  );
};

export default TopProducts;
