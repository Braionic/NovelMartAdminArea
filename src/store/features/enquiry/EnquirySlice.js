import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import enquiryServices from "./EnquiryServices";

const initialState = {
  enquiries: [],
  isLoading: false,
  error: "",
  isError: false,
};

export const getEnquiries = createAsyncThunk("api/enquiry/", async (_, thunkAPI) => {
  try {
    const data = await enquiryServices.getEnquiries();
    console.log(data)
    return data
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
const enquirySlice = createSlice({
  name: "enquiry",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getEnquiries.pending, (state, action) => {
        (state.enquiries = []),
          (state.isError = false),
          (state.isLoading = true),
          (state.error = "");
      })
      .addCase(getEnquiries.fulfilled, (state, action) => {
        (state.enquiries = action.payload),
          (state.isError = false),
          (state.isLoading = false),
          (state.error = "");
      })
      .addCase(getEnquiries.rejected, (state, action) => {
        (state.enquiries = []),
          (state.isError = true),
          (state.isLoading = false),
          (state.error = action.error);
      });
  },
});

export default enquirySlice.reducer;
