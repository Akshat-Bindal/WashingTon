"use client";
import Footer from "@/layouts/Footer";
import HeaderTwo from "@/layouts/HeaderTwo";
import React, { useEffect, useState } from "react";
import { fetchWithAuth } from "@/utils/api";

interface OrderStep {
  label: string;
  time: string;
  active: boolean;
  icon: string;
}

interface Order {
  _id: string;
  orderNumber: string;
  createdAt: string;
  steps: OrderStep[];
}

const MyOrder = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const response = await fetchWithAuth("/api/orders/my", {}, true);
        console.log("Fetched orders:", response);

        const fetchedOrders = response.orders || response; // some APIs return {orders: []}, others just []

        const mappedOrders: Order[] = fetchedOrders.map((order: any) => {
          // Map backend status → frontend steps
          const statuses = [
            { key: "requested", label: "Order Request", icon: "ti ti-basket" },
            { key: "picked_up", label: "Order Pickup", icon: "ti ti-box" },
            { key: "processing", label: "Order in processing", icon: "ti ti-trolley" },
            { key: "ready", label: "Order Ready", icon: "ti ti-truck-delivery" },
            { key: "out_for_delivery", label: "Dropping", icon: "ti ti-building-store" },
            { key: "delivered", label: "Delivered", icon: "ti ti-heart-check" },
          ];

          const steps: OrderStep[] = statuses.map((s) => ({
            label: s.label,
            time: order.updatedAt
              ? new Date(order.updatedAt).toLocaleString()
              : "Pending",
            active: s.key === order.status, // mark only current step active
            icon: s.icon,
          }));

          return {
            _id: order._id,
            orderNumber: order._id.slice(-6).toUpperCase(),
            createdAt: new Date(order.createdAt).toLocaleString(),
            steps,
          };
        });

        setOrders(mappedOrders);
      } catch (err) {
        console.error("❌ Failed to fetch orders:", err);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

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
              <h6 className="mb-3">Select Your Order</h6>

              {loading ? (
                <p>Loading your orders...</p>
              ) : orders.length === 0 ? (
                <p className="text-muted">No orders found.</p>
              ) : (
                <>
                  {/* Order selector buttons */}
                  <div className="d-flex flex-wrap gap-2 mb-4">
                    {orders.map((order) => (
                      <button
                        key={order._id}
                        className={`btn btn-sm ${
                          selectedOrder === order._id
                            ? "btn-primary"
                            : "btn-outline-primary"
                        }`}
                        onClick={() => setSelectedOrder(order._id)}
                      >
                        {order.orderNumber}
                      </button>
                    ))}
                  </div>

                  {/* Order details */}
                  {selectedOrder ? (
                    <>
                      <h6 className="mb-3">
                        Tracking for Order:{" "}
                        {
                          orders.find((o) => o._id === selectedOrder)
                            ?.orderNumber
                        }
                      </h6>

                      {orders
                        .find((o) => o._id === selectedOrder)
                        ?.steps.map((step, idx) => (
                          <div
                            key={idx}
                            className={`single-order-status ${
                              step.active ? "active" : ""
                            }`}
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
                    <p className="text-muted">
                      Please select an order to view details.
                    </p>
                  )}
                </>
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
