"use client";
import React, { useEffect, useState } from "react";
import Footer from "@/layouts/Footer";
import NiceSelect from "@/ui/NiceSelect";
import HeaderTwo from "@/layouts/HeaderTwo";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/features/cartSlice";
import { ToastContainer } from "react-toastify";
import { fetchWithAuth } from "@/utils/api";

interface Category {
  _id: string;
  name: string;
}

interface Service {
  _id: string;
  name: string;
  price: number;
  category: Category; // ✅ category is object from backend
  imageUrl?: string;
}

// IDs of the categories we want (Dry Cleaning Men, Women, Common)
const DRY_CLEAN_CATEGORY_IDS = [
  "68bc4a547f463f14c3b1e567", // Dry Cleaning - Men
  "68bc4a547f463f14c3b1e568", // Dry Cleaning - Women
  "68bc4a547f463f14c3b1e569", // Dry Cleaning - Common
];

const product_categories = [
  { value: "all", text: "All" },
  { value: "men", text: "Men" },
  { value: "women", text: "Women" },
  { value: "common", text: "Common" },
];

const ShopGrid = () => {
  const [filter, setFilter] = useState("all");
  const [filteredItems, setFilteredItems] = useState<Service[]>([]);
  const [allServices, setAllServices] = useState<Service[]>([]);

  const dispatch = useDispatch();

  // ✅ Fetch services from backend
  useEffect(() => {
    const loadServices = async () => {
      try {
        const data: Service[] = await fetchWithAuth("/api/services", {}, true);

        console.log("Services from API:", data); // 🔍 Debug log

        // ✅ keep only services with Dry Cleaning categories
        const dryCleanServices = data.filter(
          (s) => s.category && DRY_CLEAN_CATEGORY_IDS.includes(s.category._id)
        );

        setAllServices(dryCleanServices);
        setFilteredItems(dryCleanServices);
      } catch (err) {
        console.error("Error fetching services:", err);
      }
    };

    loadServices();
  }, []);

  const handleAddToCart = (item: Service) => {
    const productData = {
      service: item._id,
      img: item.imageUrl || "/assets/img/core-img/avatar.png",
      title: item.name,
      price: item.price || 0,
      quantity: 1,
    };

    dispatch(addToCart(productData));
  };

  // ✅ Filtering logic
  useEffect(() => {
    if (filter === "all") {
      setFilteredItems(allServices);
    } else if (filter === "men") {
      setFilteredItems(
        allServices.filter((s) => s.category?._id === DRY_CLEAN_CATEGORY_IDS[0])
      );
    } else if (filter === "women") {
      setFilteredItems(
        allServices.filter((s) => s.category?._id === DRY_CLEAN_CATEGORY_IDS[1])
      );
    } else if (filter === "common") {
      setFilteredItems(
        allServices.filter((s) => s.category?._id === DRY_CLEAN_CATEGORY_IDS[2])
      );
    }
  }, [filter, allServices]);

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
              {filteredItems.length > 0 ? (
                filteredItems.map((item, i) => (
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
                ))
              ) : (
                <p className="text-center text-muted">No services found.</p>
              )}
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
