import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { brandServices } from "./brandServices";

const initialState = {
  brands: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
  error: null,
};

export const getBrands = createAsyncThunk("api/brand/", async (thunkAPI) => {
  try {
    const data = await brandServices.getBrands();
    console.log(data);
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
          (state.message = payload.error),
          (state.error = payload.error);
      });
  },
});

export default brandSlice.reducer;
