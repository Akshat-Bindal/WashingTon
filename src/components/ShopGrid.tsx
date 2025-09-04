"use client";
import React from "react";
import Footer from "@/layouts/Footer";
import NiceSelect from "@/ui/NiceSelect";
import top_product from "@/data/top_product";
import HeaderTwo from "@/layouts/HeaderTwo";
import { Swiper, SwiperSlide } from "swiper/react";

import dynamic from "next/dynamic";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/features/cartSlice"; 
import { ToastContainer } from "react-toastify";

const MyTimer = dynamic(() => import("../components/common/Timer"), {
  ssr: false,
});

const product_categories = [
  {
    image: "/assets/img/300/66.png",
    title: "Women",
  },
  {
    image: "/assets/img/product/9.png",
    title: "Shoes",
  },
  {
    image: "/assets/img/product/4.png",
    title: "Dress",
  },
  {
    image: "/assets/img/product/9.png",
    title: "Shoes",
  },
  {
    image: "/assets/img/product/5.png",
    title: "Furniture",
  },
  {
    image: "/assets/img/product/4.png",
    title: "Dress",
  },
];

const ShopGrid = () => {
  const selectHandler = (e: any) => {};

  const dispatch = useDispatch();
  const handleAddToCart = (item: any) => {
    dispatch(addToCart(item));
  };

  return (
    <>
      <HeaderTwo links="home" title="Dry Clean Item" />

      <div className="page-content-wrapper">
        <div className="py-3">
          <div className="container">
            <div className="row g-1 align-items-center rtl-flex-d-row-r">
              <div className="col-8" style={{ marginTop: "-15px" }}>
                <Swiper
                  loop={true}
                  slidesPerView={2.5}
                  spaceBetween={5}
                  className="product-catagories owl-carousel catagory-slides"
                >
                  {product_categories.map((item, i) => (
                    <SwiperSlide key={i}>
                      <a className="shadow-sm" href="#">
                        <img src={item.image} alt="" />
                        {item.title}
                      </a>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              <div className="col-4">
                <div className="select-product-catagory">
                  <NiceSelect
                    className="filter-select right small border-0 d-flex align-items-center"
                    options={[
                      { value: "00", text: "Short by" },
                      { value: "01", text: "Men" },
                      { value: "02", text: "Women" },
                      { value: "04", text: "Common" },
                    ]}
                    defaultCurrent={0}
                    onChange={selectHandler}
                    placeholder="Select an option"
                    name="myNiceSelect"
                  />
                </div>
              </div>
            </div>
            <div className="mb-3"></div>

            <div className="row g-2 rtl-flex-d-row-r">
              {top_product.map((item, i) => (
                <div key={i} className="col-6 col-md-4">
                  <div className="card product-card">
                    <div className="card-body">
                      
                      <a className="wishlist-btn" href="#">
                        <i className="ti ti-heart"></i>
                      </a>

                      {/* ✅ Image + Title without Link (no redirect) */}
                      <div className="product-thumbnail d-block">
                        <img className="mb-2" src={item.img} alt="" />
                        {/* {i === 0 || i === 3 ? (
                          <ul className="offer-countdown-timer d-flex align-items-center shadow-sm">
                            <MyTimer />
                          </ul>
                        ) : null} */}
                        <p className="product-title">{item.title}</p>
                      </div>

                      <p className="sale-price">₹ {item.new_price}</p>

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

              {top_product.map((item, i) => (
                <div key={i} className="col-6 col-md-4">
                  <div className="card product-card">
                    <div className="card-body">
                      
                      <a className="wishlist-btn" href="#">
                        <i className="ti ti-heart"></i>
                      </a>

                      {/* ✅ Second grid also no Link */}
                      <div className="product-thumbnail d-block">
                        <img className="mb-2" src={item.img} alt="" />
                        <p className="product-title">{item.title}</p>
                      </div>

                      <p className="sale-price">₹ {item.new_price}</p>

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
      </div>

      <Footer />
      <ToastContainer position="top-right" />
    </>
  );
};

export default ShopGrid;
