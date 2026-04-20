import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CartPage from "./pages/CartPage";
import ProductDetails from "./pages/ProductDetails";
import OrderPlacing from './pages/OrderPlacing';
import MyOrders from './pages/MyOrders';
import AdminDashboard from './pages/AdminDashboard';
import AdminProducts from './pages/AdminProducts';


// 🔐 ADMIN ROUTE (VERY IMPORTANT)
const AdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || user.role !== "ROLE_ADMIN") {
    return <Navigate to="/" replace />;
  }

  return children;
};


function App() {

  const [search, setSearch] = useState("");

  return (
    <BrowserRouter>

      <Navbar search={search} setSearch={setSearch} />

      <div className="main-content">

        <Routes>

          <Route path="/" element={<Home search={search} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/checkout" element={<OrderPlacing />} />

          {/* USER ORDERS */}
          <Route path="/orders" element={<MyOrders />} />

          {/* ADMIN ONLY */}
          <Route
            path="/admin-dashboard"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />

            <Route
              path="/admin-products"
              element={
                <AdminRoute>
                  <AdminProducts />
                </AdminRoute>
              }
            />
        </Routes>

      </div>

      <Footer />

    </BrowserRouter>
  );
}

export default App;