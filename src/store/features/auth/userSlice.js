import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { authServices } from "./authServices";

const user = JSON.parse(localStorage.getItem("user"))
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const initialState = {
  allOrders: "",
  user: user,
  isLoading: false,
  error: null,
};

export const adminSignIn = createAsyncThunk(
  "/api/user/admin",
  async (userCredentials, thunkAPI) => {
    try {
      const data = await authServices.login(userCredentials);
      //const data = await request.data;
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const getAllOrders = createAsyncThunk(
  "/user/all-orders",
  async (_, thunkAPI) => {
    try {
      return await authServices.getAllOrders();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(adminSignIn.fulfilled, (state, action) => {
        (state.user = action.payload),
          (state.isLoading = false),
          (state.error = null);
      })
      .addCase(adminSignIn.pending, (state) => {
        (state.error = null), (state.isLoading = true), (state.user = null);
      })
      .addCase(adminSignIn.rejected, (state, action) => {
        (state.error = action?.error?.message),
          (state.isLoading = false),
          (state.user = null);
      }).addCase(getAllOrders.pending, (state, action)=>{
        (state.error = null), (state.isLoading = true), (state.allOrders = null);
      }).addCase(getAllOrders.fulfilled, (state, action)=>{
        (state.allOrders = action.payload),
        (state.isLoading = false),
        (state.error = null);
      }).addCase(getAllOrders.rejected, (state, action)=>{
        (state.error = action?.error?.message),
          (state.isLoading = false),
          (state.allOrders = null);
      })
  },
});

export default userSlice.reducer;
