'use client';

import React, { useEffect, useState } from "react";
import Footer from "@/layouts/Footer";
import NiceSelect from "@/ui/NiceSelect";
import HeaderTwo from "@/layouts/HeaderTwo";
import { Swiper, SwiperSlide } from "swiper/react";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/features/cartSlice"; 
import { ToastContainer } from "react-toastify";
import services from "@/data/washington.services.json"; 

const product_categories = [
  { value: "all", text: "All" },
  { value: "men", text: "Men" },
  { value: "women", text: "Women" },
  { value: "common", text: "Common" },
];

const ShopGrid = () => {
  const [filter, setFilter] = useState("all");
  const [filteredItems, setFilteredItems] = useState<any[]>(services);

  const dispatch = useDispatch();

  const handleAddToCart = (item: any) => {
    const productData = {
      id: String(item._id.$oid),
      img: item.imageUrl || "/assets/img/core-img/avatar.png",
      title: item.name,
      price: Number(item.price) || 0,
      quantity: 1,
    };
    dispatch(addToCart(productData));
  };

  // ✅ Filtering logic
  useEffect(() => {
    if (filter === "all") {
      setFilteredItems(services);
    } else if (filter === "men") {
      setFilteredItems(services.filter((s) =>
        ["Shirt", "Pant", "Trouser", "Kurta", "Suit", "Jacket"].some((kw) =>
          s.name.toLowerCase().includes(kw.toLowerCase())
        )
      ));
    } else if (filter === "women") {
      setFilteredItems(services.filter((s) =>
        ["Saree", "Lehenga", "Skirt", "Kurti", "Blouse", "Dress", "Gown", "Frock"].some((kw) =>
          s.name.toLowerCase().includes(kw.toLowerCase())
        )
      ));
    } else {
      // Common
      setFilteredItems(services.filter((s) =>
        ["Socks", "Towel", "Cap", "Coat", "Blanket", "Bedsheet", "Pillow", "Gloves"].some((kw) =>
          s.name.toLowerCase().includes(kw.toLowerCase())
        )
      ));
    }
  }, [filter]);

  return (
    <>
      <HeaderTwo links="home" title="Dry Clean Item" />

      <div className="page-content-wrapper">
        <div className="py-3">
          <div className="container">
            {/* Category Filter */}
            <div className="row g-1 align-items-center rtl-flex-d-row-r mb-3">
              <div className="col-12">
                <NiceSelect
                  className="filter-select right small border-0 d-flex align-items-center"
                  options={product_categories}
                  defaultCurrent={0}
                  onChange={(e: any) => setFilter(e.value)}
                  placeholder="Select category"
                  name="categorySelect"
                />
              </div>
            </div>

            {/* Product Grid */}
            <div className="row g-2 rtl-flex-d-row-r">
              {filteredItems.map((item, i) => (
                <div key={i} className="col-6 col-md-4">
                  <div className="card product-card">
                    <div className="card-body">
                      <div className="product-thumbnail d-block">
                        <img
                          className="mb-2"
                          src={item.imageUrl || "/assets/img/core-img/avatar.png"}
                          alt={item.name}
                        />
                        <p className="product-title">{item.name}</p>
                      </div>

                      <p className="sale-price">₹ {Number(item.price) || 0}</p>

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
