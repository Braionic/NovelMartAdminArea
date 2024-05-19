import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/auth/userSlice";
import customerReducer from "./features/customers/customersSlice";
import productReducer from "./features/product/productSlice";
import brandReducer from "./features/brand/brandSlice";
import categoryReducer from "./features/category/categorySlice";
import blogReducer from "./features/blog/blogSlice"
import blogCatSliceReducer from "./features/blogCat/blogCartSlice";
import orderSliceReducer from "./features/cart/cartSlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    customer: customerReducer,
    product: productReducer,
    brand: brandReducer,
    category: categoryReducer,
    blog: blogReducer,
    blogcat: blogCatSliceReducer,
    orders: orderSliceReducer
  },
});
