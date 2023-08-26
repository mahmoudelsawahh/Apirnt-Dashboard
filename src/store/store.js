import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice";
import CategoriesSlice from "./CategoriesSlice";
import EmployeesSlice from "./EmployeesSlice";
import ProductsSlice from "./ProductsSlice";
import HomeSlice from "./HomeSlice";

export default configureStore({
  reducer: {
    AuthSlice,
    CategoriesSlice,
    EmployeesSlice,
    ProductsSlice,
    HomeSlice,
  },
});
