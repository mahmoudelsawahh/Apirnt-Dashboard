import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

export const getHome = createAsyncThunk("Home/getHome", async (_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const data = await axios
      .get(`${process.env.REACT_APP_BACKEND_API}dashboard/statistics`, {
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
});

export const CreateCoupon = createAsyncThunk(
  "Home/CreateCoupon",
  async (resD, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .post(`${process.env.REACT_APP_BACKEND_API}dashboard/coupons`, resD, {
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
export const getCoupon = createAsyncThunk(
  "Home/getCoupon",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .get(`${process.env.REACT_APP_BACKEND_API}dashboard/coupons`, {
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

export const UpdateCoupon = createAsyncThunk(
  "Home/UpdateCoupon",
  async (resD, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .put(
          `${process.env.REACT_APP_BACKEND_API}dashboard/coupons/${resD.id}`,
          resD.data,
          {
            headers: {
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
export const DeleteCoupon = createAsyncThunk(
  "Home/DeleteCoupon",
  async (resD, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .delete(
          `${process.env.REACT_APP_BACKEND_API}dashboard/coupons/${resD}`,
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

export const getContacts = createAsyncThunk(
  "Home/getContacts",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .get(`${process.env.REACT_APP_BACKEND_API}dashboard/contacts`, {
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

export const DeleteContact = createAsyncThunk(
  "Home/DeleteContact",
  async (resD, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .delete(
          `${process.env.REACT_APP_BACKEND_API}dashboard/contacts/${resD}`,
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
export const getUsers = createAsyncThunk(
  "Home/getUsers",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .get(`${process.env.REACT_APP_BACKEND_API}dashboard/users`, {
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

export const getClients = createAsyncThunk(
  "Home/getClients",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .get(`${process.env.REACT_APP_BACKEND_API}dashboard/clients`, {
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

export const AddClients = createAsyncThunk(
  "Home/AddClients",
  async (resD, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .post(`${process.env.REACT_APP_BACKEND_API}dashboard/clients`, resD, {
          headers: {
            Authorization: `Bearer ${Cookies.get("Aprint_Dash_Token")}`,
            "Content-Type": "multipart/form-data",
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

export const UpdateClients = createAsyncThunk(
  "Home/UpdateClients",
  async (resD, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .post(
          `${process.env.REACT_APP_BACKEND_API}dashboard/clients/${resD.id}`,
          {
            ...resD.data,
            _method: "put",
          },
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
export const DeleteClients = createAsyncThunk(
  "Home/DeleteClients",
  async (resD, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .delete(
          `${process.env.REACT_APP_BACKEND_API}dashboard/clients/${resD}`,
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

export const getBrands = createAsyncThunk(
  "Home/getBrands",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .get(`${process.env.REACT_APP_BACKEND_API}dashboard/brands`, {
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

export const AddBrands = createAsyncThunk(
  "Home/AddBrands",
  async (resD, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .post(`${process.env.REACT_APP_BACKEND_API}dashboard/brands`, resD, {
          headers: {
            Authorization: `Bearer ${Cookies.get("Aprint_Dash_Token")}`,
            "Content-Type": "multipart/form-data",
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

export const UpdateBrands = createAsyncThunk(
  "Home/UpdateBrands",
  async (resD, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .post(
          `${process.env.REACT_APP_BACKEND_API}dashboard/brands/${resD.id}`,
          {
            ...resD.data,
            _method: "put",
          },
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

export const DeleteBrands = createAsyncThunk(
  "Home/DeleteBrands",
  async (resD, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .delete(
          `${process.env.REACT_APP_BACKEND_API}dashboard/brands/${resD}`,
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

export const getAds = createAsyncThunk("Home/getAds", async (_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const data = await axios
      .get(`${process.env.REACT_APP_BACKEND_API}dashboard/ads`, {
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
});

export const AddAds = createAsyncThunk(
  "Home/AddAds",
  async (resD, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .post(`${process.env.REACT_APP_BACKEND_API}dashboard/ads`, resD, {
          headers: {
            Authorization: `Bearer ${Cookies.get("Aprint_Dash_Token")}`,
            "Content-Type": "multipart/form-data",
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
export const UpdateAds = createAsyncThunk(
  "Home/UpdateAds",
  async (resD, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .post(
          `${process.env.REACT_APP_BACKEND_API}dashboard/ads/${resD.id}`,
          {
            ...resD.data,
            _method: "put",
          },
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
export const DeleteAds = createAsyncThunk(
  "Home/DeleteAds",
  async (resD, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .delete(`${process.env.REACT_APP_BACKEND_API}dashboard/ads/${resD}`, {
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

export const getSettings = createAsyncThunk(
  "Home/getSettings",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .get(`${process.env.REACT_APP_BACKEND_API}dashboard/settings`, {
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
export const AddSettings = createAsyncThunk(
  "Home/AddSettings",
  async (resD, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .post(`${process.env.REACT_APP_BACKEND_API}dashboard/settings`, resD, {
          headers: {
            Authorization: `Bearer ${Cookies.get("Aprint_Dash_Token")}`,
            "Content-Type": "multipart/form-data",
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
export const UpdateSettings = createAsyncThunk(
  "Home/UpdateSettings",
  async (resD, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .post(
          `${process.env.REACT_APP_BACKEND_API}dashboard/settings/${resD.id}`,
          {
            ...resD.data,
            _method: "put",
          },
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
export const DeleteSettings = createAsyncThunk(
  "Home/DeleteSettings",
  async (resD, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .delete(
          `${process.env.REACT_APP_BACKEND_API}dashboard/settings/${resD}`,
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

const HomeSlice = createSlice({
  name: "Home",
  initialState: {
    isHomeLoading: false,
    error: null,
    HomeArr: null,
    active: false,
    ReportArr: null,
    couponArr: null,
    ContactArr: null,
    ClientsArr: null,
    BrandsArr: null,
    AdsAsarr: null,
    UsersArr: null,
    SettingArr: null,
  },
  reducers: {},
  extraReducers: {
    //   // ClientsArr
    [getHome.pending]: (state, action) => {
      state.isHomeLoading = true;
    },
    [getHome.fulfilled]: (state, action) => {
      state.HomeArr = action.payload.data;
      state.isHomeLoading = false;
    },
    [getHome.rejected]: (state, action) => {
      state.isHomeLoading = false;
    },

    // getUsers
    [getUsers.pending]: (state, action) => {
      state.isHomeLoading = true;
    },
    [getUsers.fulfilled]: (state, action) => {
      state.UsersArr = action.payload.data;
      state.isHomeLoading = false;
    },
    [getUsers.rejected]: (state, action) => {
      state.isHomeLoading = false;
    },
    // CreateCoupon
    [CreateCoupon.pending]: (state, action) => {
      state.isHomeLoading = true;
    },
    [CreateCoupon.fulfilled]: (state, action) => {
      state.isHomeLoading = false;
    },
    [CreateCoupon.rejected]: (state, action) => {
      state.isHomeLoading = false;
    },
    // getCoupon
    [getCoupon.pending]: (state, action) => {
      state.isHomeLoading = true;
    },
    [getCoupon.fulfilled]: (state, action) => {
      state.couponArr = action.payload.data;
      state.isHomeLoading = false;
    },
    [getCoupon.rejected]: (state, action) => {
      state.isHomeLoading = false;
    },
    // UpdateCoupon
    [UpdateCoupon.pending]: (state, action) => {
      state.isHomeLoading = true;
    },
    [UpdateCoupon.fulfilled]: (state, action) => {
      state.isHomeLoading = false;
    },
    [UpdateCoupon.rejected]: (state, action) => {
      state.isHomeLoading = false;
    },
    // DeleteCoupon
    [DeleteCoupon.pending]: (state, action) => {
      state.isHomeLoading = true;
    },
    [DeleteCoupon.fulfilled]: (state, action) => {
      state.couponArr = state.couponArr.filter(
        (ele) => ele.id !== action.meta.arg
      );
      state.isHomeLoading = false;
    },
    [DeleteCoupon.rejected]: (state, action) => {
      state.isHomeLoading = false;
    },
    [getContacts.pending]: (state, action) => {
      state.isHomeLoading = true;
    },
    [getContacts.fulfilled]: (state, action) => {
      state.ContactArr = action.payload.data;
      state.isHomeLoading = false;
    },
    [getContacts.rejected]: (state, action) => {
      state.isHomeLoading = false;
    },
    // DeleteContact
    [DeleteContact.pending]: (state, action) => {
      state.isHomeLoading = true;
    },
    [DeleteContact.fulfilled]: (state, action) => {
      state.ContactArr = state.ContactArr.filter(
        (ele) => ele.id !== action.meta.arg
      );
      state.isHomeLoading = false;
    },
    [DeleteContact.rejected]: (state, action) => {
      state.isHomeLoading = false;
    },
    // DeleteClients

    [getClients.pending]: (state, action) => {
      state.isHomeLoading = true;
    },
    [getClients.fulfilled]: (state, action) => {
      state.ClientsArr = action.payload.data;
      state.isHomeLoading = false;
    },
    [getClients.rejected]: (state, action) => {
      state.isHomeLoading = false;
    },
    [DeleteClients.pending]: (state, action) => {
      state.isHomeLoading = true;
    },
    [DeleteClients.fulfilled]: (state, action) => {
      state.ClientsArr = state.ClientsArr.filter(
        (ele) => ele.id !== action.meta.arg
      );
      state.isHomeLoading = false;
    },
    [DeleteClients.rejected]: (state, action) => {
      state.isHomeLoading = false;
    },
    [AddClients.pending]: (state, action) => {
      state.isHomeLoading = true;
    },
    [AddClients.fulfilled]: (state, action) => {
      state.isHomeLoading = false;
    },
    [AddClients.rejected]: (state, action) => {
      state.isHomeLoading = false;
    },
    [UpdateClients.pending]: (state, action) => {
      state.isHomeLoading = true;
    },
    [UpdateClients.fulfilled]: (state, action) => {
      state.isHomeLoading = false;
    },
    [UpdateClients.rejected]: (state, action) => {
      state.isHomeLoading = false;
    },

    [getBrands.pending]: (state, action) => {
      state.isHomeLoading = true;
    },
    [getBrands.fulfilled]: (state, action) => {
      state.BrandsArr = action.payload.data;
      state.isHomeLoading = false;
    },
    [getBrands.rejected]: (state, action) => {
      state.isHomeLoading = false;
    },
    [AddBrands.pending]: (state, action) => {
      state.isHomeLoading = true;
    },
    [AddBrands.fulfilled]: (state, action) => {
      state.isHomeLoading = false;
    },
    [AddBrands.rejected]: (state, action) => {
      state.isHomeLoading = false;
    },
    [UpdateBrands.pending]: (state, action) => {
      state.isHomeLoading = true;
    },
    [UpdateBrands.fulfilled]: (state, action) => {
      state.isHomeLoading = false;
    },
    [UpdateBrands.rejected]: (state, action) => {
      state.isHomeLoading = false;
    },

    // DeleteBrands
    [DeleteBrands.pending]: (state, action) => {
      state.isHomeLoading = true;
    },
    [DeleteBrands.fulfilled]: (state, action) => {
      state.BrandsArr = state.BrandsArr.filter(
        (ele) => ele.id !== action.meta.arg
      );
      state.isHomeLoading = false;
    },
    [DeleteBrands.rejected]: (state, action) => {
      state.isHomeLoading = false;
    },

    [getAds.pending]: (state, action) => {
      state.isHomeLoading = true;
    },
    [getAds.fulfilled]: (state, action) => {
      state.AdsAsarr = action.payload.data;
      state.isHomeLoading = false;
    },
    [getAds.rejected]: (state, action) => {
      state.isHomeLoading = false;
    },
    [AddAds.pending]: (state, action) => {
      state.isHomeLoading = true;
    },
    [AddAds.fulfilled]: (state, action) => {
      state.isHomeLoading = false;
    },
    [AddAds.rejected]: (state, action) => {
      state.isHomeLoading = false;
    },
    [UpdateAds.pending]: (state, action) => {
      state.isHomeLoading = true;
    },
    [UpdateAds.fulfilled]: (state, action) => {
      state.isHomeLoading = false;
    },
    [UpdateAds.rejected]: (state, action) => {
      state.isHomeLoading = false;
    },

    [DeleteAds.pending]: (state, action) => {
      state.isHomeLoading = true;
    },
    [DeleteAds.fulfilled]: (state, action) => {
      state.AdsAsarr = state.AdsAsarr.filter(
        (ele) => ele.id !== action.meta.arg
      );
      state.isHomeLoading = false;
    },
    [DeleteAds.rejected]: (state, action) => {
      state.isHomeLoading = false;
    },

    // getSettings
    [getSettings.pending]: (state, action) => {
      state.isHomeLoading = true;
    },
    [getSettings.fulfilled]: (state, action) => {
      state.SettingArr = action.payload.data;
      state.isHomeLoading = false;
    },
    [getSettings.rejected]: (state, action) => {
      state.isHomeLoading = false;
    },

    [AddSettings.pending]: (state, action) => {
      state.isHomeLoading = true;
    },
    [AddSettings.fulfilled]: (state, action) => {
      state.isHomeLoading = false;
    },
    [AddSettings.rejected]: (state, action) => {
      state.isHomeLoading = false;
    },
    [UpdateSettings.pending]: (state, action) => {
      state.isHomeLoading = true;
    },
    [UpdateSettings.fulfilled]: (state, action) => {
      state.isHomeLoading = false;
    },
    [UpdateSettings.rejected]: (state, action) => {
      state.isHomeLoading = false;
    },

    [DeleteSettings.pending]: (state, action) => {
      state.isHomeLoading = true;
    },
    [DeleteSettings.fulfilled]: (state, action) => {
      state.SettingArr = state.SettingArr.filter(
        (ele) => ele.id !== action.meta.arg
      );
      state.isHomeLoading = false;
    },
    [DeleteSettings.rejected]: (state, action) => {
      state.isHomeLoading = false;
    },
  },
});
// export const { ChangeActiveStatus } = HomeSlice.actions;

export default HomeSlice.reducer;
