import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { productServices } from "./productServices";
//import fetchProduct from "./productServices"

const initialState = {
  products: [],
  isLoading: false,
  isError: false,
  message: "",
  isSUccessful: false,
  addedProduct: ""
};

export const productGet = createAsyncThunk(
  "api/products/",
  async (_, thunkAPI) => {
    try {
      const product = await productServices.fetchProduct();
      return product;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const addProduct = createAsyncThunk(
  "api/product/",
  async (data, thunkAPI) => {
    try {
      return await productServices.uploadProduct(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
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
      })
      .addCase(addProduct.pending, (state, action) => {
        (state.isLoading = true), (state.isError = false);
      }).addCase(addProduct.fulfilled, (state, action)=>{
        state.isLoading = false,
        state.isError = false,
        state.isSUccessful = true,
        state.addedProduct = action.payload,
        state.message = action.payload
      }).addCase(addProduct.rejected, (state, action)=>{
        state.isLoading = false,
        state.isError = true,
        state.isSUccessful = false,
        state.message = action.error
      })
  },
});

export default productSlice.reducer;
