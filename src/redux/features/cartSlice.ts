import { toast } from "react-toastify";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getLocalStorage, setLocalStorage } from "@/utils/localstorage"; 

// Product aligned with backend
interface Product {
  service: string;   // ✅ MongoDB _id
  title: string;
  quantity: number;
  price: number;
  img?: string;
}

interface CartState {
  cart: Product[];
}

const initialState: CartState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, { payload }: PayloadAction<Product>) => {
      const productIndex = state.cart.findIndex((item) => item.service === payload.service);

      if (productIndex >= 0) {
        state.cart[productIndex].quantity += 1;
        toast.info(`${payload.title} quantity increased`, { position: "top-right" });
      } else {
        const tempProduct = { ...payload, quantity: 1 };
        state.cart.push(tempProduct);
        toast.success(`${payload.title} added to cart`, { position: "top-right" });
      }
      setLocalStorage("cart", state.cart);
    },

    decrease_quantity: (state, { payload }: PayloadAction<Product>) => {
      const cartIndex = state.cart.findIndex((item) => item.service === payload.service);
      if (state.cart[cartIndex].quantity > 1) {
        state.cart[cartIndex].quantity -= 1;
        toast.error(`${payload.title} decreased quantity`, { position: "top-right" });
      }
      setLocalStorage("cart", state.cart);
    },

    remove_cart_product: (state, { payload }: PayloadAction<Product>) => {
      state.cart = state.cart.filter((item) => item.service !== payload.service);
      toast.error(`Removed from cart`, { position: "top-right" });
      setLocalStorage("cart", state.cart);
    },

    clear_cart: (state) => {
      const confirmMsg = window.confirm("Are you sure you want to clear the cart?");
      if (confirmMsg) {
        state.cart = [];
      }
      setLocalStorage("cart", state.cart);
    },

    get_cart_products: (state) => {
      state.cart = getLocalStorage<Product>("cart") || [];
    },

    quantityDecrement: (state, { payload }: PayloadAction<Product>) => {
      state.cart = state.cart.map((item) => {
        if (item.service === payload.service && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
      setLocalStorage("cart", state.cart);
    },
  },
});

export const {
  addToCart,
  decrease_quantity,
  remove_cart_product,
  clear_cart,
  get_cart_products,
  quantityDecrement,
} = cartSlice.actions;

export default cartSlice.reducer;
