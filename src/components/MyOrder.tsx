"use client";
import Footer from "@/layouts/Footer";
import HeaderTwo from "@/layouts/HeaderTwo";
import React, { useState } from "react";

const orders = [
  {
    id: 1,
    orderNumber: "ORD12345",
    date: "03 Jan 2025 - 12:38 PM",
    status: [
      { label: "Order Request", time: "03 Jan 2025 - 12:38 PM", active: true, icon: "ti ti-basket" },
      { label: "Order Pickup", time: "04 Jan 2025 - 10:20 AM", active: true, icon: "ti ti-box" },
      { label: "Order in processing", time: "05 Jan 2025", active: true, icon: "ti ti-trolley" },
      { label: "Order Ready", time: "Estimate: 06 Jan 2025", active: false, icon: "ti ti-truck-delivery" },
      { label: "Dropping", time: "Estimate: 07 Jan 2025", active: false, icon: "ti ti-building-store" },
      { label: "Delivered", time: "Estimate: 08 Jan 2025", active: false, icon: "ti ti-heart-check" },
    ],
  },
  {
    id: 2,
    orderNumber: "ORD67890",
    date: "15 Jan 2025 - 09:15 AM",
    status: [
      { label: "Order Request", time: "15 Jan 2025 - 09:15 AM", active: true, icon: "ti ti-basket" },
      { label: "Order Pickup", time: "16 Jan 2025", active: true, icon: "ti ti-box" },
      { label: "Order in processing", time: "17 Jan 2025", active: false, icon: "ti ti-trolley" },
      { label: "Order Ready", time: "Estimate: 18 Jan 2025", active: false, icon: "ti ti-truck-delivery" },
      { label: "Dropping", time: "Estimate: 19 Jan 2025", active: false, icon: "ti ti-building-store" },
      { label: "Delivered", time: "Estimate: 20 Jan 2025", active: false, icon: "ti ti-heart-check" },
    ],
  },
];

const MyOrder = () => {
  const [selectedOrder, setSelectedOrder] = useState<number | null>(null);

  return (
    <>
      <HeaderTwo links="profile" title="Order Status" />

      <div
        className="my-order-wrapper"
        style={{ backgroundImage: `url(/assets/img/bg-img/21.jpg)` }}
      >
        <div className="container">
          <div className="card">
            <div className="card-body p-4">
              {/* Order Selector */}
              <h6 className="mb-3">Select Your Order</h6>
              <div className="d-flex flex-wrap gap-2 mb-4">
                {orders.map((order) => (
                  <button
                    key={order.id}
                    className={`btn btn-sm ${
                      selectedOrder === order.id ? "btn-primary" : "btn-outline-primary"
                    }`}
                    onClick={() => setSelectedOrder(order.id)}
                  >
                    {order.orderNumber}
                  </button>
                ))}
              </div>

              {/* Show Order Details */}
              {selectedOrder ? (
                <>
                  <h6 className="mb-3">
                    Tracking for Order:{" "}
                    {
                      orders.find((o) => o.id === selectedOrder)?.orderNumber
                    }
                  </h6>
                  {orders
                    .find((o) => o.id === selectedOrder)
                    ?.status.map((step, idx) => (
                      <div
                        key={idx}
                        className={`single-order-status ${step.active ? "active" : ""}`}
                      >
                        <div className="order-icon">
                          <i className={step.icon}></i>
                        </div>
                        <div className="order-text">
                          <h6>{step.label}</h6>
                          <span>{step.time}</span>
                        </div>
                        <div className="order-status">
                          <i className="ti ti-circle-check"></i>
                        </div>
                      </div>
                    ))}
                </>
              ) : (
                <p className="text-muted">Please select an order to view details.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="internet-connection-status" id="internetStatus"></div>
      <Footer />
    </>
  );
};

export default MyOrder;
