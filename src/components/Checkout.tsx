"use client";
import Footer from "@/layouts/Footer";
import HeaderTwo from "@/layouts/HeaderTwo";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Count from "./common/Count";
import UseCartInfo from "@/hooks/UseCartInfo";
import { fetchWithAuth } from "@/utils/api";
import { useRouter } from "next/navigation";

const Checkout = () => {
  const router = useRouter(); // ✅ moved inside component
  const { total } = UseCartInfo();
  const [laundryType, setLaundryType] = useState("sameDay");
  const [extraCharge, setExtraCharge] = useState(200);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch billing info
  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await fetchWithAuth("/api/users/me", {}, true);
        setUser({
          name: data.name,
          email: data.email,
          phone: data.phone,
          address: data.addresses?.[0] || "Not provided",
        });
      } catch (err) {
        console.error("Error loading profile:", err);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const finalTotal = total + extraCharge;

  const handleLaundryChange = (type: string, charge: number): void => {
    setLaundryType(type);
    setExtraCharge(charge);
  };

  const handleConfirmOrder = async (): Promise<void> => {
    try {
      const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");

      const services = cartItems.map((item: any) => {
        if (!item.service) {
          throw new Error(`Cart item "${item.title}" is missing service ID`);
        }
        return {
          service: item.service,
          quantity: item.quantity || 1,
        };
      });

      let urgency = "normal";
      if (laundryType === "nextDay") urgency = "next-day";
      if (laundryType === "sameDay") urgency = "same-day";

      const shippingAddresses = user?.address || "Default Address";

      const orderData = {
        services,
        urgency,
        shippingAddresses,
        pickup_time: "Morning",
      };

      const response = await fetchWithAuth(
        "/api/orders/checkout",
        {
          method: "POST",
          body: JSON.stringify(orderData),
        },
        true
      );

      console.log("✅ Order placed:", response);
      setOrderPlaced(true);

      localStorage.removeItem("cart");

      setTimeout(() => {
        setOrderPlaced(false);
        router.push("/my-order"); // ✅ redirect after success
      }, 3000);
    } catch (err: unknown) {
      console.error("❌ Error placing order:", err);
      let errorMessage = "An unexpected error occurred";
      if (err instanceof Error) errorMessage = err.message;
      else if (typeof err === "string") errorMessage = err;
      alert(`Failed to place order: ${errorMessage}`);
    }
  };

  return (
    <>
      <HeaderTwo links="cart" title="Billing Information" />

      <div className="page-content-wrapper">
        <div className="container">
          <div className="checkout-wrapper-area py-3">
            {/* Billing Info */}
            <div className="billing-information-card mb-3">
              <div className="card billing-information-title-card">
                <div className="card-body">
                  <h6 className="text-center mb-0">Billing Information</h6>
                </div>
              </div>

              <div className="card user-data-card">
                <div className="card-body">
                  {loading ? (
                    <p>Loading billing info...</p>
                  ) : user ? (
                    <>
                      <div className="single-profile-data d-flex align-items-center justify-content-between">
                        <div className="title d-flex align-items-center">
                          <i className="ti ti-user"></i> <span>Full Name</span>
                        </div>
                        <div className="data-content">{user.name}</div>
                      </div>
                      <div className="single-profile-data d-flex align-items-center justify-content-between">
                        <div className="title d-flex align-items-center">
                          <i className="ti ti-mail"></i> <span>Email Address</span>
                        </div>
                        <div className="data-content">{user.email}</div>
                      </div>
                      <div className="single-profile-data d-flex align-items-center justify-content-between">
                        <div className="title d-flex align-items-center">
                          <i className="ti ti-phone"></i> <span>Phone</span>
                        </div>
                        <div className="data-content">{user.phone}</div>
                      </div>
                      <div className="single-profile-data d-flex align-items-center justify-content-between">
                        <div className="title d-flex align-items-center">
                          <i className="ti ti-ship"></i> <span>Shipping:</span>
                        </div>
                        <div className="data-content">{user.address}</div>
                      </div>

                      {/* Buttons */}
                      <div className="d-grid gap-2 mt-3">
                        <Link className="btn btn-primary w-100" href="/edit-profile">
                          Edit Billing Information
                        </Link>
                        <Link className="btn btn-outline-primary w-100" href="/other-address">
                          Use Other Address
                        </Link>
                      </div>
                    </>
                  ) : (
                    <p className="text-danger">Failed to load billing info</p>
                  )}
                </div>
              </div>
            </div>

            {/* Laundry Type */}
            <div className="shipping-method-choose mb-3">
              <div className="card shipping-method-choose-title-card">
                <div className="card-body">
                  <h6 className="text-center mb-0">Laundry Type</h6>
                </div>
              </div>

              <div className="card shipping-method-choose-card">
                <div className="card-body">
                  <div className="shipping-method-choose">
                    <ul className="ps-0">
                      <li>
                        <input
                          id="sameDay"
                          type="radio"
                          name="laundryType"
                          checked={laundryType === "sameDay"}
                          onChange={() => handleLaundryChange("sameDay", 200)}
                        />
                        <label htmlFor="sameDay">
                          Same Day Delivery <span>₹200 extra</span>
                        </label>
                        <div className="check"></div>
                      </li>
                      <li>
                        <input
                          id="nextDay"
                          type="radio"
                          name="laundryType"
                          checked={laundryType === "nextDay"}
                          onChange={() => handleLaundryChange("nextDay", 100)}
                        />
                        <label htmlFor="nextDay">
                          Next Day Delivery <span>₹100 extra</span>
                        </label>
                        <div className="check"></div>
                      </li>
                      <li>
                        <input
                          id="regularLaundry"
                          type="radio"
                          name="laundryType"
                          checked={laundryType === "regularLaundry"}
                          onChange={() => handleLaundryChange("regularLaundry", 0)}
                        />
                        <label htmlFor="regularLaundry">
                          Regular <span>3-5 days (Free)</span>
                        </label>
                        <div className="check"></div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Total & Pay */}
            <div className="card cart-amount-area">
              <div className="card-body d-flex align-items-center justify-content-between">
                <h5 className="total-price mb-0">
                  ₹ <span className="counter"><Count number={finalTotal} /></span>
                </h5>
                <button className="btn btn-primary" onClick={handleConfirmOrder}>
                  Confirm Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Order success notification */}
      {orderPlaced && (
        <div
          className="toast shadow bg-success text-white position-fixed bottom-0 end-0 m-3 p-3"
          style={{ zIndex: 9999 }}
        >
          ✅ Your order has been placed successfully! Redirecting...
        </div>
      )}

      <div className="internet-connection-status" id="internetStatus"></div>
      <Footer />
    </>
  );
};

export default Checkout;
