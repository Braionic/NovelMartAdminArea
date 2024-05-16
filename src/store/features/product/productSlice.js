import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { productServices } from "./productServices";
//import fetchProduct from "./productServices"

const initialState = {
  products: [],
  isLoading: false,
  isError: false,
  message: "",
  isSUccessful: false,
};

export const productGet = createAsyncThunk("api/product/", async (_, thunkAPI) => {
  try {
    const product = await productServices.fetchProduct();
    return product
  } catch (e) {
    return thunkAPI.rejectWithValue(e);
  }
});
const productSlice = createSlice({
  name: "product",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(productGet.pending, (state, action) => {
        (state.products = []),
          (state.isLoading = true),
          (state.isError = false),
          (state.isSUccessful = false);
      })
      .addCase(productGet.fulfilled, (state, action) => {
        (state.products = action.payload),
          (state.isLoading = false),
          (state.isError = false),
          (state.isSUccessful = true);
      })
      .addCase(productGet.rejected, (state, action) => {
        (state.products = []),
          (state.isLoading = false),
          (state.isError = true),
          (state.isSUccessful = false),
          (state.message = action.error);
      });
  },
});

export default productSlice.reducer;
