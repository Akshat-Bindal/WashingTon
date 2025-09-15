// "use client";
// import React from "react";
// import Link from "next/link";
// import product_catagories from "@/data/product_catagories";
// import { useDispatch } from "react-redux";
// import { addToCart } from "@/redux/features/cartSlice";
// import { toast } from "react-toastify";
// import { useRouter } from "next/navigation";

// const ProductCatagories = () => {
//   const router = useRouter();
//   const dispatch = useDispatch();

//   const handleAddToCart = (item: any) => {
//     if (item.title === "Dry Clean") {
//       // 🚀 Redirect instead of adding to cart
//       router.push("/shop-grid");
//       return;
//     }

//     // Convert category → product-like object
//     const productData = {
//       id: item.id,
//       img: item.img,
//       productName: item.title,
//       new_price: item.price || 100, // fallback price
//       quantity: 1,
//     };

//     dispatch(addToCart(productData));
//     toast.success(`${item.title} added to cart ✅`, { autoClose: 2000 });
//   };

//   return (
//     <div className="product-catagories-wrapper py-3">
//       <div className="container">
//         <div className="row g-2 rtl-flex-d-row-r">
//           {product_catagories.map((item, i) => (
//             <div key={i} className="col-6 col-md-3">
//               <div className={`card catagory-card ${i === 7 ? "active" : ""}`}>
//                 <div className="card-body text-center px-2">
//                   {/* ✅ Image + Title → Clickable Link */}
//                   <Link href="/catagory" className="d-block">
//                     <img
//                       src={item.img}
//                       alt={item.title}
//                       style={{ height: "100px", objectFit: "contain" }}
//                     />
//                     <span className="d-block mt-2">{item.title}</span>
//                   </Link>

//                   {/* ✅ Button → Only Cart or Redirect */}
//                   <button
//                     className="btn btn-primary btn-sm mt-2 w-100"
//                     onClick={() => handleAddToCart(item)}
//                   >
//                     {item.title === "Dry Clean" ? "Dry Clean Now" : "Book Now"}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductCatagories;



"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/features/cartSlice";
import { useRouter } from "next/navigation";
import product_catagories_raw from "@/data/product_catagories.json";

interface ProductCategory {
  id: string;
  title: string;
  price: number;
  img: string;
  service: string; // ✅ Needed for cart
}

const ProductCatagories = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [categories, setCategories] = useState<ProductCategory[]>([]);

  // ✅ Normalize JSON shape to match ProductCategory
  useEffect(() => {
    const normalized = product_catagories_raw.map((item: any) => ({
      id: item._id?.$oid || item._id || String(Math.random()), // fallback if no id
      title: item.name,
      price: item.price,
      img: item.imageUrl,
      service: item._id?.$oid || item._id, // ✅ service field for cart
    }));

    setCategories(normalized);
  }, []);

  const handleAddToCart = (item: ProductCategory) => {
    if (item.title === "Dry Clean") {
      // 🚀 Redirect instead of adding to cart
      router.push("/shop-grid");
      return;
    }

    const productData = {
      service: item.service, // ✅ required by cartSlice
      img: item.img,
      title: item.title,
      price: Number(item.price),
      quantity: 1,
    };

    dispatch(addToCart(productData));
  };

  return (
    <div className="product-catagories-wrapper py-3">
      <div className="container">
        <div className="row g-2 rtl-flex-d-row-r">
          {categories.map((item, i) => (
            <div key={item.id} className="col-6 col-md-3">
              <div className={`card catagory-card ${i === 100 ? "active" : ""}`}>
                <div className="card-body text-center px-2">
                  {/* ✅ Image + Title → Clickable Link */}
                  <Link href="#" className="d-block">
                    <img
                      src={item.img}
                      alt={item.title}
                      style={{ height: "100px", objectFit: "contain" }}
                    />
                    <span className="d-block mt-2">{item.title}</span>
                    <p className="mb-1">₹{item.price}</p>
                  </Link>
                  <button
                    className="btn btn-primary btn-sm mt-2 w-100"
                    onClick={() => handleAddToCart(item)}
                  >
                    {item.title === "Dry Clean" ? "Dry Clean Now" : "Book Now"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCatagories;
