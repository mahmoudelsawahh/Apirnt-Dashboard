import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .get(`${process.env.REACT_APP_BACKEND_API}dashboard/products`, {
          headers: {
            Authorization: `Bearer ${Cookies.get("Aprint_Dash_Token")}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then((res) => res.data);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
export const getOneProduct = createAsyncThunk(
  "products/getOneProduct",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .get(`${process.env.REACT_APP_BACKEND_API}dashboard/products/${id}`, {
          headers: {
            Authorization: `Bearer ${Cookies.get("Aprint_Dash_Token")}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then((res) => res.data);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
export const getServices = createAsyncThunk(
  "products/getServices",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .get(`${process.env.REACT_APP_BACKEND_API}dashboard/services`, {
          headers: {
            Authorization: `Bearer ${Cookies.get("Aprint_Dash_Token")}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then((res) => res.data);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const AddProduct = createAsyncThunk(
  "products/AddProduct",
  async (resD, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .post(`${process.env.REACT_APP_BACKEND_API}dashboard/products`, resD, {
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${Cookies.get("Aprint_Dash_Token")}`,
          },
        })
        .then((res) => res.data);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
export const AddServices = createAsyncThunk(
  "products/AddServices",
  async (resD, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .post(`${process.env.REACT_APP_BACKEND_API}dashboard/services`, resD, {
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${Cookies.get("Aprint_Dash_Token")}`,
          },
        })
        .then((res) => res.data);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const UPdateService = createAsyncThunk(
  "products/UPdateService",
  async (resD, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .post(
          `${process.env.REACT_APP_BACKEND_API}dashboard/services/${resD.id}`,
          { ...resD.data, _method: "put" },
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${Cookies.get("Aprint_Dash_Token")}`,
              "Cache-Control": "no-cache",
              // ...resD.getHeaders(),
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
export const DeleteService = createAsyncThunk(
  "products/DeleteService",
  async (resD, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .delete(
          `${process.env.REACT_APP_BACKEND_API}dashboard/services/${resD}`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${Cookies.get("Aprint_Dash_Token")}`,
              "Cache-Control": "no-cache",
              // ...resD.getHeaders(),
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
export const UPdateProduct = createAsyncThunk(
  "products/UPdateProduct",
  async (resD, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .post(
          `${process.env.REACT_APP_BACKEND_API}dashboard/products/${resD.id}`,
          { ...resD.data, _method: "put" },
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${Cookies.get("Aprint_Dash_Token")}`,
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

export const DeleteProduct = createAsyncThunk(
  "products/DeleteProduct",
  async (resD, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .delete(
          `${process.env.REACT_APP_BACKEND_API}dashboard/products/${resD}`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${Cookies.get("Aprint_Dash_Token")}`,
              "Cache-Control": "no-cache",
              // ...resD.getHeaders(),
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

export const getCurrentProductOrders = createAsyncThunk(
  "products/getCurrentProductOrders",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .get(`${process.env.REACT_APP_BACKEND_API}dashboard/product/orders`, {
          headers: {
            Authorization: `Bearer ${Cookies.get("Aprint_Dash_Token")}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          params: {
            status: 1,
          },
        })
        .then((res) => res.data);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const UPdatecurrentOrders = createAsyncThunk(
  "products/UPdatecurrentOrders",
  async (resD, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .put(
          `${process.env.REACT_APP_BACKEND_API}dashboard/orders/${resD.id}`,
          {
            ...resD.Data,
          },
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
export const getPastProductOrders = createAsyncThunk(
  "products/getPastProductOrders",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .get(`${process.env.REACT_APP_BACKEND_API}dashboard/product/orders`, {
          headers: {
            Authorization: `Bearer ${Cookies.get("Aprint_Dash_Token")}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          params: {
            status: 2,
          },
        })
        .then((res) => res.data);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
export const getCurrentServicesOrders = createAsyncThunk(
  "products/getCurrentServicesOrders",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .get(`${process.env.REACT_APP_BACKEND_API}dashboard/orders`, {
          headers: {
            Authorization: `Bearer ${Cookies.get("Aprint_Dash_Token")}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          params: {
            status: 1,
          },
        })
        .then((res) => res.data);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
export const getPastServicesOrders = createAsyncThunk(
  "products/getPastServicesOrders",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .get(`${process.env.REACT_APP_BACKEND_API}dashboard/orders`, {
          headers: {
            Authorization: `Bearer ${Cookies.get("Aprint_Dash_Token")}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          params: {
            status: 2,
          },
        })
        .then((res) => res.data);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
export const UPdateOrders = createAsyncThunk(
  "products/UPdateOrders",
  async (resD, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .put(
          `${process.env.REACT_APP_BACKEND_API}dashboard/orders/${resD.id}`,
          {
            status: resD.status_id,
          },
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
export const getServicessPayment = createAsyncThunk(
  "products/getServicessPayment",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .get(`${process.env.REACT_APP_BACKEND_API}dashboard/payments`, {
          headers: {
            Authorization: `Bearer ${Cookies.get("Aprint_Dash_Token")}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          params: {
            type: 2,
          },
        })
        .then((res) => res.data);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
export const getProductsPayment = createAsyncThunk(
  "products/getProductsPayment",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .get(`${process.env.REACT_APP_BACKEND_API}dashboard/payments`, {
          headers: {
            Authorization: `Bearer ${Cookies.get("Aprint_Dash_Token")}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          params: {
            type: 1,
          },
        })
        .then((res) => res.data);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const AddHeader = createAsyncThunk(
  "products/AddHeader",
  async (resD, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .post(
          `${process.env.REACT_APP_BACKEND_API}dashboard/headers`,
          { ...resD },
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${Cookies.get("Aprint_Dash_Token")}`,
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
export const DeleteHeader = createAsyncThunk(
  "products/DeleteHeader",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .delete(`${process.env.REACT_APP_BACKEND_API}dashboard/headers/${id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${Cookies.get("Aprint_Dash_Token")}`,
          },
        })
        .then((res) => res.data);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// export const AddFooter = createAsyncThunk(
//   "products/AddFooter",
//   async (resD, thunkAPI) => {
//     const { rejectWithValue } = thunkAPI;
//     try {
//       const data = await axios
//         .post(
//           `${process.env.REACT_APP_BACKEND_API}dashboard/footers`,
//           { ...resD },
//           {
//             headers: {
//               Accept: "application/json",
//               "Content-Type": "multipart/form-data",
//               Authorization: `Bearer ${Cookies.get("Aprint_Dash_Token")}`,
//             },
//           }
//         )
//         .then((res) => res.data);
//       return data;
//     } catch (err) {
//       return rejectWithValue(err.message);
//     }
//   }
// );

export const UpdateFooter = createAsyncThunk(
  "products/UpdateFooter",
  async (resD, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .put(
          `${process.env.REACT_APP_BACKEND_API}dashboard/footers/${resD.id}`,
          { ...resD.data },
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${Cookies.get("Aprint_Dash_Token")}`,
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

export const Deletefooter = createAsyncThunk(
  "products/Deletefooter",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .delete(`${process.env.REACT_APP_BACKEND_API}dashboard/footers/${id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${Cookies.get("Aprint_Dash_Token")}`,
          },
        })
        .then((res) => res.data);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const AddSection = createAsyncThunk(
  "products/AddSection",
  async (resD, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .post(
          `${process.env.REACT_APP_BACKEND_API}dashboard/sections`,
          { ...resD },
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${Cookies.get("Aprint_Dash_Token")}`,
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

export const DeleteSection = createAsyncThunk(
  "products/DeleteSection",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .delete(
          `${process.env.REACT_APP_BACKEND_API}dashboard/sections/${id}`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${Cookies.get("Aprint_Dash_Token")}`,
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

export const AddOptions = createAsyncThunk(
  "products/AddOptions",
  async (resD, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .post(
          `${process.env.REACT_APP_BACKEND_API}dashboard/options`,
          { ...resD },
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${Cookies.get("Aprint_Dash_Token")}`,
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

export const DeleteOptions = createAsyncThunk(
  "products/DeleteOptions",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .delete(`${process.env.REACT_APP_BACKEND_API}dashboard/options/${id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${Cookies.get("Aprint_Dash_Token")}`,
          },
        })
        .then((res) => res.data);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);



export const UpdateOptions = createAsyncThunk(
  "products/UpdateOptions",
  async (resD, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .post(
          `${process.env.REACT_APP_BACKEND_API}dashboard/options/${resD.product_id}`,
          { ...resD },
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${Cookies.get("Aprint_Dash_Token")}`,
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


export const AddNestedOfOptions = createAsyncThunk(
  "products/AddNestedOfOptions",
  async (resD, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .post(
          `${process.env.REACT_APP_BACKEND_API}dashboard/options`,
          { ...resD },
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${Cookies.get("Aprint_Dash_Token")}`,
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




const ProductsSlice = createSlice({
  name: "products",
  initialState: {
    isProductLoading: false,
    error: null,
    Products: null,
    OrdersArr: null,
    ServiceArr: null,
    PastOrdersArr: null,
    ServicessOrder: null,
    PastServicesOrderArr: null,
    ServicesPaymentArr: null,
    ProdcutsPaymentArr: null,
  },

  extraReducers: {
    [getProducts.pending]: (state, action) => {
      state.isProductLoading = true;
    },
    [getProducts.fulfilled]: (state, action) => {
      state.Products = action.payload.data;
      state.isProductLoading = false;
    },
    [getProducts.rejected]: (state, action) => {
      state.isProductLoading = false;
    },
    // getOneProduct
    [getOneProduct.pending]: (state, action) => {
      state.isProductLoading = true;
    },
    [getOneProduct.fulfilled]: (state, action) => {
      state.isProductLoading = false;
    },
    [getOneProduct.rejected]: (state, action) => {
      state.isProductLoading = false;
    },
    // getServices

    [getServices.pending]: (state, action) => {
      state.isProductLoading = true;
    },
    [getServices.fulfilled]: (state, action) => {
      state.ServiceArr = action.payload.data;
      state.isProductLoading = false;
    },
    [getServices.rejected]: (state, action) => {
      state.isProductLoading = false;
    },
    // AddServices
    [AddServices.pending]: (state, action) => {
      state.isProductLoading = true;
    },
    [AddServices.fulfilled]: (state, action) => {
      // state.Products.push(action.payload.data);
      state.isProductLoading = false;
    },
    [AddServices.rejected]: (state, action) => {
      state.isProductLoading = false;
    },

    [UPdateService.pending]: (state, action) => {
      state.isProductLoading = true;
    },
    [UPdateService.fulfilled]: (state, action) => {
      state.isProductLoading = false;
    },

    [UPdateService.rejected]: (state, action) => {
      state.isProductLoading = false;
    },
    // DeleteService
    [DeleteService.pending]: (state, action) => {
      state.isProductLoading = true;
    },
    [DeleteService.fulfilled]: (state, action) => {
      // state.Products = state.Products.filter(
      //   (ele) => ele.id !== action.meta.arg
      // );
      state.isProductLoading = false;
    },
    [DeleteService.rejected]: (state, action) => {
      state.isProductLoading = false;
    },
    [UPdateProduct.pending]: (state, action) => {
      state.isProductLoading = true;
    },
    [UPdateProduct.fulfilled]: (state, action) => {
      state.isProductLoading = false;
    },
    [UPdateProduct.rejected]: (state, action) => {
      state.isProductLoading = false;
    },
    [DeleteProduct.pending]: (state, action) => {
      state.isProductLoading = true;
    },
    [DeleteProduct.fulfilled]: (state, action) => {
      // state.Products = state.Products.filter(
      //   (ele) => ele.id !== action.meta.arg
      // );
      state.isProductLoading = false;
    },
    [DeleteProduct.rejected]: (state, action) => {
      state.isProductLoading = false;
    },
    [AddProduct.pending]: (state, action) => {
      state.isProductLoading = true;
    },
    [AddProduct.fulfilled]: (state, action) => {
      state.isProductLoading = false;
    },
    [AddProduct.rejected]: (state, action) => {
      state.isProductLoading = false;
    },
    // getCurrentProductOrders
    [getCurrentProductOrders.pending]: (state, action) => {
      state.isProductLoading = true;
    },
    [getCurrentProductOrders.fulfilled]: (state, action) => {
      state.OrdersArr = action.payload.data;
      state.isProductLoading = false;
    },
    [getCurrentProductOrders.rejected]: (state, action) => {
      state.isProductLoading = false;
    },
    // getPastProductOrders
    [getPastProductOrders.pending]: (state, action) => {
      state.isProductLoading = true;
    },
    [getPastProductOrders.fulfilled]: (state, action) => {
      state.PastOrdersArr = action.payload.data;
      state.isProductLoading = false;
    },
    [getPastProductOrders.rejected]: (state, action) => {
      state.isProductLoading = false;
    },
    // getCurrentServicesOrders
    [getCurrentServicesOrders.pending]: (state, action) => {
      state.isProductLoading = true;
    },
    [getCurrentServicesOrders.fulfilled]: (state, action) => {
      state.ServicessOrder = action.payload.data;
      state.isProductLoading = false;
    },
    [getCurrentServicesOrders.rejected]: (state, action) => {
      state.isProductLoading = false;
    },
    // getPastProductOrders
    [getPastServicesOrders.pending]: (state, action) => {
      state.isProductLoading = true;
    },
    [getPastServicesOrders.fulfilled]: (state, action) => {
      state.PastServicesOrderArr = action.payload.data;
      state.isProductLoading = false;
    },
    [getPastServicesOrders.rejected]: (state, action) => {
      state.isProductLoading = false;
    },
    // UPdateOrders
    [UPdateOrders.pending]: (state, action) => {
      state.isProductLoading = true;
    },
    [UPdateOrders.fulfilled]: (state, action) => {
      state.isProductLoading = false;
    },

    [UPdateOrders.rejected]: (state, action) => {
      state.isProductLoading = false;
    },
    [getServicessPayment.pending]: (state, action) => {
      state.isProductLoading = true;
    },
    [getServicessPayment.fulfilled]: (state, action) => {
      state.isProductLoading = false;
      state.ServicesPaymentArr = action.payload.data;
    },

    [getServicessPayment.rejected]: (state, action) => {
      state.isProductLoading = false;
    },
    [getProductsPayment.pending]: (state, action) => {
      state.isProductLoading = true;
    },
    [getProductsPayment.fulfilled]: (state, action) => {
      state.isProductLoading = false;
      state.ProdcutsPaymentArr = action.payload.data;
    },

    [getProductsPayment.rejected]: (state, action) => {
      state.isProductLoading = false;
    },
    // AddHeader
    [AddHeader.pending]: (state, action) => {
      state.isProductLoading = true;
    },
    [AddHeader.fulfilled]: (state, action) => {
      state.isProductLoading = false;
    },

    [AddHeader.rejected]: (state, action) => {
      state.isProductLoading = false;
    },

    // DeleteHeader
    [DeleteHeader.pending]: (state, action) => {
      state.isProductLoading = true;
    },
    [DeleteHeader.fulfilled]: (state, action) => {
      state.isProductLoading = false;
    },

    [DeleteHeader.rejected]: (state, action) => {
      state.isProductLoading = false;
    },

    [UpdateFooter.pending]: (state, action) => {
      state.isProductLoading = true;
    },
    [UpdateFooter.fulfilled]: (state, action) => {
      state.isProductLoading = false;
    },

    [UpdateFooter.rejected]: (state, action) => {
      state.isProductLoading = false;
    },

    // DeleteHeader
    [Deletefooter.pending]: (state, action) => {
      state.isProductLoading = true;
    },
    [Deletefooter.fulfilled]: (state, action) => {
      state.isProductLoading = false;
    },

    [Deletefooter.rejected]: (state, action) => {
      state.isProductLoading = false;
    },

    [AddSection.pending]: (state, action) => {
      state.isProductLoading = true;
    },
    [AddSection.fulfilled]: (state, action) => {
      state.isProductLoading = false;
    },

    [AddSection.rejected]: (state, action) => {
      state.isProductLoading = false;
    },

    // DeleteHeader
    [DeleteSection.pending]: (state, action) => {
      state.isProductLoading = true;
    },
    [DeleteSection.fulfilled]: (state, action) => {
      state.isProductLoading = false;
    },

    [DeleteSection.rejected]: (state, action) => {
      state.isProductLoading = false;
    },

    [AddOptions.pending]: (state, action) => {
      state.isProductLoading = true;
    },
    [AddOptions.fulfilled]: (state, action) => {
      state.isProductLoading = false;
    },

    [AddOptions.rejected]: (state, action) => {
      state.isProductLoading = false;
    },

    // DeleteHeader
    [DeleteOptions.pending]: (state, action) => {
      state.isProductLoading = true;
    },
    [DeleteOptions.fulfilled]: (state, action) => {
      state.isProductLoading = false;
    },

    [DeleteOptions.rejected]: (state, action) => {
      state.isProductLoading = false;
    },

    //update options

      [UpdateOptions.pending]: (state, action) => {
      state.isProductLoading = true;
    },
    [UpdateOptions.fulfilled]: (state, action) => {
      state.isProductLoading = false;
    },

    [UpdateOptions.rejected]: (state, action) => {
      state.isProductLoading = false;
    },

    //Add Sub option

    [AddNestedOfOptions.pending]: (state, action) => {
      state.isProductLoading = true;
    },
    [AddNestedOfOptions.fulfilled]: (state, action) => {
      state.isProductLoading = false;
    },

    [AddNestedOfOptions.rejected]: (state, action) => {
      state.isProductLoading = false;
    },
  },
});

export default ProductsSlice.reducer;
