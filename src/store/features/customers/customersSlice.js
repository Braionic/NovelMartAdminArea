import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { customerServices } from "./customerService";

const initialState = {
  customer: [],
  isLoading: false,
  error: null,
};

export const allCustomers = createAsyncThunk(
  "user/all-users",
  async (thunkAPI) => {
    try {
      return await customerServices.allCustomers();
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
  }
);

const customerSlice = createSlice({
  name: "customer",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(allCustomers.fulfilled, (state, action) => {
        console.log(action.payload)
        state.customer = action.payload;
          state.isLoading = false;
          state.error = null;
      })
      .addCase(allCustomers.pending, (state) => {
        (state.customer = null), (state.isLoading = true), (state.error = null);
      })
      .addCase(allCustomers.rejected, (state, action) => {
        (state.customer = null),
          (state.isLoading = false),
          (state.error = action?.error);
      });
  },
});

export default customerSlice.reducer;
