import { Route, Routes } from "react-router-dom";
// import { useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/auth/login";
import Products from "./pages/Products";
// import Cookies from "js-cookie";
import Protected from "./pages/auth/Protected";
// import Navbar from "./components/layouts/Navbar";
// import Sidebar from "./components/layouts/Sidebar";
// import Cookies from "js-cookie";
import "./styles/style.css";
import Categories from "./pages/Categories";
import Empolyees from "./pages/Empolyees";
// import Orders from "./pages/ProductOrders";
// import MainProducts from "./pages/MainProducts";
import MainServices from "./pages/MainServices";
import Services from "./pages/Services";
import { useSelector } from "react-redux";
import Loader from "./components/layouts/loading/loading";
import { Suspense } from "react";
import CouponPage from "./pages/CouponPage";
import Contact from "./pages/Contact";
import ProductCategory from "./pages/ProductCategory";
import Clients from "./pages/Clients";
import Brands from "./pages/Brands";
import Ads from "./pages/Ads";
import Users from "./pages/Users";
import ProductOrders from "./pages/ProductOrders";
import Pastorder from "./pages/Pastorder";
import SrvicesOrder from "./pages/SrvicesOrder";
import PastServices from "./pages/PastServices";
import ServicessPayment from "./pages/ServicessPayment";
import ProductPayment from "./pages/ProductPayment";
import ShowProduct from "./components/DashBoard/Products/ShowProduct";
import HomeOptions from "./pages/HomeOptions";

function App() {
  const { isAuthLoading } = useSelector((state) => state.AuthSlice);
  const { isHomeLoading } = useSelector((state) => state.HomeSlice);
  const { isCategoryLoading } = useSelector((state) => state.CategoriesSlice);
  const { isProductLoading } = useSelector((state) => state.ProductsSlice);

  return (
    <>
      {isAuthLoading && <Loader />}
      {isHomeLoading && <Loader />}
      {isCategoryLoading && <Loader />}
      {isProductLoading && <Loader />}
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route element={<Protected />}>
            <Route path="/dashboard" element={<Home />} />
            <Route path="/coupons" element={<CouponPage />} />
            {/* HomeOptions */}
            {/* <Route path="/main-products" element={<MainProducts />} /> */}
            <Route path="/products" element={<Products />} />
            <Route path="/services" element={<MainServices />} />
            <Route path="/sub-services" element={<Services />} />
            <Route path="/current-product-orders" element={<ProductOrders />} />
            <Route path="/past-product-orders" element={<Pastorder />} />
            <Route path="/current-services-orders" element={<SrvicesOrder />} />
            <Route path="/past-services-orders" element={<PastServices />} />
            <Route path="/servicess-payment" element={<ServicessPayment />} />
            <Route path="/products-payment" element={<ProductPayment />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/product-categories" element={<ProductCategory />} />
            <Route path="/show/:id" element={<ShowProduct />} />
            <Route path="/employees" element={<Empolyees />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/brands" element={<Brands />} />
            <Route path="/ads" element={<Ads />} />
            <Route path="/users" element={<Users />} />
            <Route path="/home-options" element={<HomeOptions />} />
            <Route path="*" element={<Home />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
