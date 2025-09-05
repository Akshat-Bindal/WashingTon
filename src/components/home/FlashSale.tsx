"use client";
import React from "react";
import flash_sale from "@/data/flash_sale";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/features/cartSlice"; // 👈 import action
import { toast } from "react-toastify";

const FlashSale = () => {
  const dispatch = useDispatch();

  const handleOrder = (item: any) => {
    dispatch(addToCart(item)); // 👈 add product to redux cart
    toast.success(`${item.title} added to cart ✅`, { autoClose: 2000 });
  };

  return (
    <div className="container py-3">
      <h5 className="mb-3">Flash Sale</h5>
      <div className="row">
        {flash_sale.map((item) => (
          <div key={item.id} className="col-6 col-md-3 mb-4">
            <div className="card shadow-sm h-100">
              <img
                src={item.img}
                className="card-img-top"
                alt={item.title}
                style={{ height: "150px", objectFit: "contain" }}
              />
              <div className="card-body text-center">
                <h6 className="card-title">{item.title}</h6>
                <p className="mb-1">₹{item.new_price}</p>
                <button
                  className="btn btn-primary btn-sm w-100"
                  onClick={() => handleOrder(item)}
                >
                  Order Place
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlashSale;
