import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const Url = "https://phplaravel-956370-3334747.cloudwaysapps.com/";
// GetHome
// const config = {
//   headers: {
//     "Api-Version": "v1",
//     "Api-Key":
//       "eyJpdiI6ImlUemFXUjV4Wmx6YTF5bzRrL0FMMWc9PSIsInZhbHVlIjoidng4OFoxeTVMUFFOQWNsZ3cvaUh0bXptT0RMbVVxS0ljL09HWk1wOWR6YWp6ZmVPZndNT3BhUDRhak04N3poQyIsIm1hYyI6IjVhNzQ3MzRhYWE2ZDMxMGI5ZGNlYmY5YzQ3ZjFhZWViNThhNmQ5OTA5MmY4OWNhYTM1MmE0MTE5Y2Q5NzBmMWIiLCJ0YWciOiIifQ==",
//   },
// };

export const getEmployees = createAsyncThunk(
  "Employees/getEmployees",
  async (resD, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .get(`${Url}api/employees`, {
          headers: {
            Authorization: `Bearer  ${Cookies.get("StoreToken")}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          // params: {
          //   offset: 0,
          //   limit: 5,
          // },
        })
        .then((res) => res.data);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const AddEmployees = createAsyncThunk(
  "Employees/AddEmployees",
  async (resD, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .post(
          `${Url}api/employees`,
          { ...resD },
          {
            headers: {
              Authorization: `Bearer  ${Cookies.get("StoreToken")}`,
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

export const UpdateEmployees = createAsyncThunk(
  "Employees/UpdateEmployees",
  async (resD, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .put(
          `${Url}api/employees/${resD.id}`,
          { name: resD.name },
          {
            headers: {
              Authorization: `Bearer  ${Cookies.get("StoreToken")}`,
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

export const DeleteEmployees = createAsyncThunk(
  "Employees/DeleteEmployees",
  async (resD, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .delete(`${Url}api/employees/${resD}`, {
          headers: {
            Authorization: `Bearer  ${Cookies.get("StoreToken")}`,
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

const EmployeesSlice = createSlice({
  name: "Employees",
  initialState: {
    isLoading: false,
    error: null,
    empolyees: null,
  },
  // reducers: {
  //   GetProjects: (state, action) => {
  //     // console.log(action.payload);
  //     state.Projects = action.payload;
  //   },
  // },
  extraReducers: {
    //   // ClientsArr
    // [getEmployees.pending]: (state, action) => {
    //   state.empolyees = [];
    //   console.log(action.payload);
    // },
    [getEmployees.fulfilled]: (state, action) => {
      if (!action.payload.data) {
        state.empolyees = [];
      } else {
        state.empolyees = action.payload.data;
      }
      console.log(action.payload);
    },
    [getEmployees.rejected]: (state, action) => {
      // state.LoginArr = action.payload.data;
      console.log(action);
    },
    [AddEmployees.fulfilled]: (state, action) => {
      if (action.payload.data) {
        state.empolyees.push(action.payload.data);
      }
      console.log(action.payload);
    },
    [AddEmployees.rejected]: (state, action) => {
      // state.LoginArr = action.payload.data;
      console.log(action);
    },
    // UpdateCategories
    [UpdateEmployees.fulfilled]: (state, action) => {
      // state.Categ.push(action.payload.data);
      state.empolyees = state.empolyees.map(
        (obj) => [action.payload.data].find((o) => o.id === obj.id) || obj
      );
      console.log(action.payload.data);
    },
    [UpdateEmployees.rejected]: (state, action) => {
      // state.LoginArr = action.payload.data;
      console.log(action);
    },
    // // DeleteCategories

    [DeleteEmployees.fulfilled]: (state, action) => {
      // state.Categ.push(action.payload.data);
      // state.Categ = state.Categ.map(
      //   (obj) => [action.payload.data].find((o) => o.id === obj.id) || obj
      // );
      state.empolyees = state.empolyees.filter(
        (ele) => ele.id !== action.meta.arg
      );
      console.log(action);
    },
    [DeleteEmployees.rejected]: (state, action) => {
      // state.LoginArr = action.payload.data;
      console.log(action);
    },
  },
});
// export const { GetProjects } = HomeSlice.actions;

export default EmployeesSlice.reducer;
