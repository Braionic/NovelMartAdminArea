import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/pages/Login.jsx";
import Logout from "./components/pages/Logout.jsx";
import LayoutRoute from "./components/pages/LayoutRoute.jsx";
import Enquiry from "./components/pages/Enquiries.jsx";
import Products from "./components/pages/Products.jsx";
import Customers from "./components/pages/Customers.jsx";
import Blogs from "./components/pages/Blogs.jsx";
import AddProduct from "./components/pages/AddProduct.jsx";
import AddBrand from "./components/pages/AddBrand.jsx";
import BrandList from "./components/pages/BrandList.jsx";
import AddCategories from "./components/pages/AddCategories.jsx";
import Categories from "./components/pages/Categories.jsx";
import Orders from "./components/pages/Orders.jsx";
import BlogCategories from "./components/pages/BlogCategories.jsx";
import AddBlog from "./components/pages/AddBlog.jsx";
import AddBlogCat from "./components/pages/AddBlogCat.jsx";
import {Provider} from 'react-redux'
import { store } from "./store/store.js";

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
        <Route path="add-brand" element={<AddBrand />} />
        <Route path="add-blog" element={<AddBlog />} />
        <Route path="add-blog-cat" element={<AddBlogCat />} />
        <Route path="blog-categories" element={<BlogCategories />} />
        <Route path="add-categories" element={<AddCategories />} />
        <Route path="categories" element={<Categories />} />
        <Route path="orders" element={<Orders />} />

        <Route path="enquiries" element={<Enquiry />} />
      </Route>
    </Routes>
  </BrowserRouter>
  </Provider>
);
