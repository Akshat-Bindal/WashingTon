"use client";
import Link from "next/link";
import UseCartInfo from "@/hooks/UseCartInfo";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decrease_quantity,
  remove_cart_product,
} from "@/redux/features/cartSlice";

const CartArea = () => {
  const productItem = useSelector((state: any) => state.cart.cart);
  const dispatch = useDispatch();
  const { total } = UseCartInfo();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  // handle pickup timing
  const [pickupTime, setPickupTime] = useState<string>("");

  return (
    <>
      <div className="page-content-wrapper">
        <div className="container">
          <div className="cart-wrapper-area py-3">
            {/* Cart Table */}
            <div className="cart-table card mb-3">
              <div className="table-responsive card-body">
                <table className="table mb-0">
                  <tbody>
                    {productItem.map((item: any, i: number) => (
                      <tr key={i}>
                        <th scope="row">
                          <a
                            className="remove-product"
                            style={{ cursor: "pointer" }}
                            onClick={() => dispatch(remove_cart_product(item))}
                          >
                            <i className="ti ti-x"></i>
                          </a>
                        </th>
                        <td>
                          <img
                            className="rounded"
                            src={item.img}
                            alt={
                              item.productName ||
                              item.name ||
                              item.title ||
                              "Product"
                            }
                          />
                        </td>
                        <td className="text-center">
                          <Link className="product-title" href="/single-product">
                            {item.productName ||
                              item.name ||
                              item.title ||
                              "Unnamed Product"}
                            <span className="mt-1">₹ {item.new_price}</span>
                          </Link>
                        </td>
                        <td>
                          <div className="tp-cart-quantity d-flex justify-content-end">
                            <div className="tp-product-quantity p-relative mt-10 mb-10">
                              <span
                                style={{ cursor: "pointer" }}
                                className="tp-cart-minus"
                                onClick={() => dispatch(decrease_quantity(item))}
                              >
                                -
                              </span>
                              <input
                                className="tp-cart-input"
                                type="text"
                                onChange={handleSubmit}
                                value={item.quantity}
                                readOnly
                              />
                              <span
                                style={{ cursor: "pointer" }}
                                className="tp-cart-plus"
                                onClick={() => dispatch(addToCart(item))}
                              >
                                +
                              </span>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pickup Timing Selection */}
            <div className="card cart-amount-area">
              <div className="card-body">
                <div className="tp-cart-subtotal d-flex justify-content-between">
                  <h5>Subtotal</h5>
                  <h5>₹ {total}</h5>
                </div>

                <div className="shipping-method-choose mb-3">
                  <div className="card shipping-method-choose-title-card">
                    <div className="card-body">
                      <h6 className="text-center mb-0">Select Pickup Time</h6>
                    </div>
                  </div>
                  <div className="card shipping-method-choose-card">
                    <div className="card-body" style={{ paddingLeft: "0" }}>
                      <div className="shipping-method-choose">
                        <ul className="ps-0">
                          <li>
                            <input
                              id="morning"
                              type="radio"
                              name="pickup"
                              onChange={() => setPickupTime("Morning")}
                            />
                            <label htmlFor="morning">Morning (8AM - 12PM)</label>
                            <div className="check"></div>
                          </li>
                          <li>
                            <input
                              id="afternoon"
                              type="radio"
                              name="pickup"
                              onChange={() => setPickupTime("Afternoon")}
                            />
                            <label htmlFor="afternoon">
                              Afternoon (12PM - 4PM)
                            </label>
                            <div className="check"></div>
                          </li>
                          <li>
                            <input
                              id="evening"
                              type="radio"
                              name="pickup"
                              onChange={() => setPickupTime("Evening")}
                            />
                            <label htmlFor="evening">Evening (4PM - 8PM)</label>
                            <div className="check"></div>
                          </li>
                        </ul>
                      </div>
                      {!pickupTime && (
                        <p className="text-danger mt-2 small">
                          Please select a pickup time.
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Total Section */}
                <div className="tp-cart-subtotal d-flex justify-content-between">
                  <h5>Total</h5>
                  <h5>₹ {total}</h5>
                </div>

                <Link
                  className={`btn w-100 ${
                    pickupTime ? "btn-primary" : "btn-secondary disabled"
                  }`}
                  href={pickupTime ? "/checkout" : "#"}
                  onClick={(e) => {
                    if (!pickupTime) e.preventDefault();
                  }}
                >
                  Checkout Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="internet-connection-status" id="internetStatus"></div>
    </>
  );
};

export default CartArea;
