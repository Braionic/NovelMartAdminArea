import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/auth/userSlice";
import customerReducer from "./features/customers/customersSlice";
import productReducer from "./features/product/productSlice";
import brandReducer from "./features/brand/brandSlice";
import categoryReducer from "./features/category/categorySlice";
import blogReducer from "./features/blog/blogSlice"
import blogCatSliceReducer from "./features/blogCat/blogCartSlice";
import orderSliceReducer from "./features/cart/cartSlice";
import colorReducer from "./features/color/colorSlice";
import enquiryReducer from "./features/enquiry/EnquirySlice"
import imageReducer from "./features/image/imageSlice";
import couponReducer from "./features/coupon/couponSlice";
import tagSlice from "./features/tag/tagSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    customer: customerReducer,
    product: productReducer,
    brand: brandReducer,
    category: categoryReducer,
    blog: blogReducer,
    blogcat: blogCatSliceReducer,
    orders: orderSliceReducer,
    color: colorReducer,
    enquiry: enquiryReducer,
    image: imageReducer,
    coupon: couponReducer,
    tag: tagSlice
  },
});
