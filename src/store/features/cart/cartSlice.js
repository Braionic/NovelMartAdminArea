import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchOrder } from "./cartServices";

const initialState = {
  orders: [],
  isLoading: false,
  isSuccess: false,
  message: "",
  isError: false,
  error: null,
};

export const getAllOrders = createAsyncThunk(
  "user/user-orders",
  async (_, thunkAPI) => {
    try {
      const chai = await fetchOrder.fetchOrders();
      console.log(chai);
      return chai;
    } catch (error) {
     return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrders.pending, (state, action) => {
        (state.orders = []),
          (state.isLoading = true),
          (state.message = ""),
          (state.isError = false);
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        (state.orders = action.payload),
          (state.isLoading = false),
          (state.message = ""),
          (state.isError = false);
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        (state.orders = []),
          (state.isLoading = false),
          (state.message = action.error),
          (state.isError = true);
      });
  },
});

export default orderSlice.reducer;
