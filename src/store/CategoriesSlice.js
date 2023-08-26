import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

export const getCategories = createAsyncThunk(
  "categories/getCategories",
  async (res, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .get(`${process.env.REACT_APP_BACKEND_API}dashboard/categories`, {
          headers: {
            Authorization: `Bearer ${Cookies.get("Aprint_Dash_Token")}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          params: {
            offset: 0,
            limit: 100000,
            owner_type: res,
          },
        })
        .then((res) => res.data);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
export const getProductsCategories = createAsyncThunk(
  "categories/getProductsCategories",
  async (res, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .get(`${process.env.REACT_APP_BACKEND_API}dashboard/categories`, {
          headers: {
            Authorization: `Bearer ${Cookies.get("Aprint_Dash_Token")}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          params: {
            offset: 0,
            limit: 100000,
            owner_type: res,
          },
        })
        .then((res) => res.data);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const AddCategories = createAsyncThunk(
  "categories/AddCategories",
  async (resD, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .post(
          `${process.env.REACT_APP_BACKEND_API}dashboard/categories`,
          { ...resD },
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("Aprint_Dash_Token")}`,
              "Content-Type": "multipart/form-data",
              Accept: "application/json",
            },
          }
        )
        .then((res) => res.data);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const UpdateCategories = createAsyncThunk(
  "categories/UpdateCategories",
  async (resD, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .post(
          `${process.env.REACT_APP_BACKEND_API}dashboard/categories/${resD.id}`,
          { ...resD.data, _method: "put" },
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("Aprint_Dash_Token")}`,
              "Content-Type": "multipart/form-data",
              Accept: "application/json",
            },
          }
        )
        .then((res) => res.data);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const DeleteCategories = createAsyncThunk(
  "categories/DeleteCategories",
  async (resD, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .delete(
          `${process.env.REACT_APP_BACKEND_API}dashboard/categories/${resD}`,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("Aprint_Dash_Token")}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        )
        .then((res) => res.data);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const CategoriesSlice = createSlice({
  name: "categories",
  initialState: {
    isCategoryLoading: false,
    error: null,
    Categ: null,
    proCateg: null,
  },

  extraReducers: {
    [getCategories.pending]: (state, action) => {
      state.isCategoryLoading = true;
    },
    [getCategories.fulfilled]: (state, action) => {
      state.Categ = action.payload.data;
      state.isCategoryLoading = false;
    },
    [getCategories.rejected]: (state, action) => {
      state.isCategoryLoading = false;
    },
    // getProductsCategories
    [getProductsCategories.pending]: (state, action) => {
      state.isCategoryLoading = true;
    },
    [getProductsCategories.fulfilled]: (state, action) => {
      state.proCateg = action.payload.data;
      state.isCategoryLoading = false;
    },
    [getProductsCategories.rejected]: (state, action) => {
      state.isCategoryLoading = false;
    },
    // AddCategories
    [AddCategories.pending]: (state, action) => {
      state.isCategoryLoading = true;
    },
    [AddCategories.fulfilled]: (state, action) => {
      // state.Categ.push(action.payload.data);
      state.isCategoryLoading = false;
    },
    [AddCategories.rejected]: (state, action) => {
      state.isCategoryLoading = false;
    },
    // UpdateCategories
    [UpdateCategories.pending]: (state, action) => {
      state.isCategoryLoading = true;
    },
    [UpdateCategories.fulfilled]: (state, action) => {
      // state.Categ.push(action.payload.data);
      state.isCategoryLoading = false;

      // state.Categ = state.Categ.map(
      //   (obj) => [action.payload.data].find((o) => o.id === obj.id) || obj
      // );
    },
    [UpdateCategories.rejected]: (state, action) => {
      state.isCategoryLoading = false;
    },
    // DeleteCategories
    [DeleteCategories.pending]: (state, action) => {
      state.isCategoryLoading = true;
    },
    [DeleteCategories.fulfilled]: (state, action) => {
      // state.Categ = state.Categ.filter((ele) => ele.id !== action.meta.arg);
      state.isCategoryLoading = false;
    },
    [DeleteCategories.rejected]: (state, action) => {
      state.isCategoryLoading = false;
    },
  },
});

export default CategoriesSlice.reducer;
