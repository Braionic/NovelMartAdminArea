import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { brandServices } from "./brandServices";

const initialState = {
  brands: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
  error: null,
  addedBrand: null
};

export const createBrand = createAsyncThunk(
  "api/brands",
  async (data, thunkAPI) => {
    try {
      return brandServices.addBrand(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getBrands = createAsyncThunk("api/brand/", async (thunkAPI) => {
  try {
    const data = await brandServices.getBrands();
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const brandSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBrands.pending, (state, action) => {
        (state.brands = []),
          (state.isError = false),
          (state.isLoading = true),
          (state.isSuccess = false),
          (state.message = ""),
          (state.error = null);
      })
      .addCase(getBrands.fulfilled, (state, action) => {
        (state.brands = action.payload),
          (state.isError = false),
          (state.isLoading = false),
          (state.isSuccess = true),
          (state.message = ""),
          (state.error = null);
        console.log(action.payload);
      })
      .addCase(getBrands.rejected, (state, action) => {
        (state.brands = []),
          (state.isError = true),
          (state.isLoading = false),
          (state.isSuccess = false),
          (state.message = action.error),
          (state.error = action.error);
      }).addCase(createBrand.pending, (state, action)=>{
        state.isLoading = true,
        state.isSuccess = false,
        state.addedBrand = ""
      }).addCase(createBrand.fulfilled, (state, action)=>{
        state.isLoading = false,
        state.isError = false,
        state.isSuccess = true,
        state.addedBrand = action.payload
      }).addCase(createBrand.rejected, (state, action)=>{
        state.isLoading = false,
        state.addedBrand = ""
        state.isError = true,
        state.isSuccess = false,
        state.error = action.error
      })
  },
});

export default brandSlice.reducer;
