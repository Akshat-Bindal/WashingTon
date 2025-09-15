"use client";

import "../styles/style.css";
import "../styles/style.scss";

import React, { ReactNode, useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import store from "@/redux/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "@/context/AuthContext";
import SessionPersistence from "@/app/SessionPersistence";
import { get_cart_products } from "@/redux/features/cartSlice";

// ✅ Wrapper to dispatch cart initialization
const AppWrapper = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Load cart from localStorage on app start
    dispatch(get_cart_products());
  }, [dispatch]);

  return <>{children}</>;
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" theme-color="dark">
      <head>
        <title>WashingTons Laundry</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Provider store={store}>
          <AuthProvider>
            {/* ✅ Wrap children with SessionPersistence + cart loader */}
            <AppWrapper>
              <SessionPersistence>{children}</SessionPersistence>
            </AppWrapper>
            <ToastContainer position="top-right" />
          </AuthProvider>
        </Provider>
      </body>
    </html>
  );
}
