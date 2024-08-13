import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Logout from "./pages/Logout.jsx";
import LayoutRoute from "./pages/LayoutRoute.jsx";
import Enquiry from "./pages/Enquiries.jsx";
import Products from "./pages/Products.jsx";
import Customers from "./pages/Customers.jsx";
import Blogs from "./pages/Blogs.jsx";
import AddProduct from "./pages/AddProduct.jsx";
import AddBrand from "./pages/AddBrand.jsx";
import BrandList from "./pages/BrandList.jsx";
import AddCategories from "./pages/AddCategories.jsx";
import Categories from "./pages/Categories.jsx";
import Orders from "./pages/Orders.jsx";
import BlogCategories from "./pages/BlogCategories.jsx";
import AddBlog from "./pages/AddBlog.jsx";
import AddBlogCat from "./pages/AddBlogCat.jsx";
import {Provider} from 'react-redux'
import { store } from "./store/store.js";
import Colors from "./pages/Color.jsx";
import ColorList from "./pages/ColorList.jsx";
import AddCoupon from "./pages/AddCoupon.jsx";
import ListCoupons from "./pages/ListCoupons.jsx";
import UpdateEnqStatus from "./pages/UpdateEnqStatus.jsx";
import AddTag from "./pages/AddTag.jsx";
import TagList from "./pages/TagList.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="logout" element={<Logout />} />
      <Route path="/admin" element={<LayoutRoute />}>
        <Route index element={<App />} />
        <Route path="add-product" element={<AddProduct />} />
        <Route path="products" element={<Products />} />
        <Route path="customers" element={<Customers />} />
        <Route path="blogs" element={<Blogs />} />
        <Route path="brand-list" element={<BrandList />} />
        <Route path="tag-list" element={<TagList />} />
        <Route path="add-brand" element={<AddBrand />} />
        <Route path="add-tag" element={<AddTag />} />
        <Route path="add-brand/:id" element={<AddBrand />} />
        <Route path="add-blog" element={<AddBlog />} />
        <Route path="add-blog-cat" element={<AddBlogCat />} />
        <Route path="add-blog-cat/:id" element={<AddBlogCat />} />
        <Route path="blog-categories" element={<BlogCategories />} />
        <Route path="add-categories" element={<AddCategories />} />
        <Route path="categories" element={<Categories />} />
        <Route path="orders" element={<Orders />} />
        <Route path="color" element={<Colors />} />
        <Route path="color-list" element={<ColorList />} />
        <Route path="enquiries" element={<Enquiry />} />
        <Route path="enquiries/:id" element={<UpdateEnqStatus />} />
        <Route path="add-coupon" element={<AddCoupon />} />
        <Route path="add-coupon/:id" element={<AddCoupon />} />
        <Route path="list-coupons" element={<ListCoupons />} />
       
      </Route>
    </Routes>
  </BrowserRouter>
  </Provider>
);
