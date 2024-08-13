import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { couponServices } from "./couponServices";

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
  coupons: "",
  error: null,
  createdCoupon: null,
  deletedCoupon: "",
  oneCoupon: "",
};

//reset redux state
export const revertAll = createAction("Reset_all");

export const createCoupon = createAsyncThunk(
  "create-coupon",
  async (data, thunkAPI) => {
    try {
      const response = await couponServices.addCoupon(data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteCouponCode = createAsyncThunk(
  "api/delete",
  async (id, thunkAPI) => {
    try {
      return await couponServices.deleteCoupon(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const allCoupons = createAsyncThunk(
  "get-coupons",
  async (_, thunkAPI) => {
    try {
      const response = await couponServices.getCoupons();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getOneCoupon = createAsyncThunk(
  "get-coupon",
  async (id, thunkAPI) => {
    try {
      const response = await couponServices.getACoupon(id);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(allCoupons.pending, (state, action) => {
        (state.isLoading = true),
          (state.isError = false),
          (state.isSuccess = false);
      })
      .addCase(allCoupons.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.isError = false),
          (state.isSuccess = true),
          (state.coupons = action.payload);
      })
      .addCase(allCoupons.rejected, (state, action) => {
        (state.isLoading = false),
          (state.isError = true),
          (state.isSuccess = false),
          (state.error = action.error),
          (state.coupons = "");
      })
      .addCase(createCoupon.pending, (state, action) => {
        (state.isLoading = true),
          (state.isError = false),
          (state.createdCoupon = "");
      })
      .addCase(createCoupon.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.isError = false),
          (state.isSuccess = true),
          (state.createdCoupon = action.payload);
      })
      .addCase(createCoupon.rejected, (state, action) => {
        (state.isLoading = false),
          (state.isError = true),
          (state.isSuccess = false),
          (state.message = action.error),
          (state.createdCoupon = "");
      })
      .addCase(deleteCouponCode.pending, (state, action) => {
        (state.isLoading = true),
          (state.isError = false),
          (state.deletedCoupon = "");
      })
      .addCase(deleteCouponCode.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.isError = false),
          (state.isSuccess = true),
          (state.deletedCoupon = action.payload);
      })
      .addCase(deleteCouponCode.rejected, (state, action) => {
        (state.isLoading = false),
          (state.isError = true),
          (state.isSuccess = false),
          (state.message = action.error),
          (state.deletedCoupon = "");
      })
      .addCase(getOneCoupon.pending, (state, action) => {
        (state.isLoading = true),
          (state.isError = false),
          (state.oneCoupon = "");
      })
      .addCase(getOneCoupon.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.isError = false),
          (state.isSuccess = true),
          (state.oneCoupon = action.payload[0].title);
      })
      .addCase(getOneCoupon.rejected, (state, action) => {
        (state.isLoading = false),
          (state.isError = true),
          (state.isSuccess = false),
          (state.message = action.error),
          (state.oneCoupon = "");
      })
      .addCase(revertAll, () => initialState);
  },
});

export default couponSlice.reducer;
