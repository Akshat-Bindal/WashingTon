"use client";
import React from "react";
import flash_sale from "@/data/flash_sale.json";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/features/cartSlice";
import { toast } from "react-toastify";

interface FlashSaleItem {
  _id: { $oid: string };
  name: string;
  description: string;
  price: number;
  category: { $oid: string };
  imageUrl: string;
}

const FlashSale = () => {
  const dispatch = useDispatch();

  const handleOrder = (item: FlashSaleItem) => {
    const productData = {
      service: item._id.$oid, // ✅ MongoDB service id
      img: item.imageUrl || "/assets/img/core-img/avatar.png",
      title: item.name,
      price: item.price || 0,
      quantity: 1,
    };

    dispatch(addToCart(productData));
    toast.success(`${item.name} added to cart ✅`, { autoClose: 2000 });
  };

  return (
    <div className="container py-3">
      <h5 className="mb-3">Flash Sale</h5>
      <div className="row">
        {flash_sale.map((item: FlashSaleItem) => (
          <div key={item._id.$oid} className="col-6 col-md-3 mb-4">
            <div className="card shadow-sm h-100">
              <img
                src={item.imageUrl}
                className="card-img-top"
                alt={item.name}
                style={{ height: "150px", objectFit: "contain" }}
              />
              <div className="card-body text-center">
                <h6 className="card-title">{item.name}</h6>
                <p className="mb-1">₹{item.price}</p>
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
