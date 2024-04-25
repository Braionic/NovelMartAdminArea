import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/pages/Login.jsx";
import Logout from "./components/pages/Logout.jsx";
import LayoutRoute from "./components/pages/LayoutRoute.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
<BrowserRouter>
<Routes>
<Route path="login" element={<Login />} />
  <Route path="logout" element={<Logout />} />
  <Route path="/" element={<LayoutRoute />}>
    <Route index element={<App />} />
  </Route>
</Routes>
</BrowserRouter>);
