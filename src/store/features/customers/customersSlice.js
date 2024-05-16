import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { customerServices } from "./customerService";

const initialState = {
  customer: [],
  isLoading: false,
  error: null,
  isError: false,
  isSuccess: false,
  message: "",
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
        console.log(action.payload);
        state.customer = action.payload;
        state.isError = false;
        state.isSuccess = true;
        state.message = "data fetched successfully";
        state.isLoading = false;
        state.error = null;
      })
      .addCase(allCustomers.pending, (state) => {
        (state.customer = null),
          (state.isLoading = true),
          (state.error = null),
          (state.isError = false),
          (state.isSuccess = false),
          (state.message = "currently pending");
      })
      .addCase(allCustomers.rejected, (state, action) => {
        (state.customer = null),
          (state.isError = true),
          (state.message = `an error occure ${action.error}`),
          (state.isSuccess = false),
          (state.isLoading = false),
          (state.error = action?.error);
      });
  },
});

export default customerSlice.reducer;
