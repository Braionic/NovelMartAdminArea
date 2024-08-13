import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import enquiryServices from "./EnquiryServices";

const initialState = {
  enquiries: [],
  isLoading: false,
  error: "",
  isSuccess: false,
  isError: false,
  deletedEnquiry: "",
  singleEnq: "",
  updatedStatus: ""
};

export const revertAll = createAction("reset_All");

export const singleEnquiry = createAsyncThunk(
  "api/getsin",
  async (id, thunkAPI) => {
    try {
      return await enquiryServices.getSingleEnq(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getEnquiries = createAsyncThunk(
  "api/enquiry/",
  async (_, thunkAPI) => {
    try {
      const data = await enquiryServices.getEnquiries();
      console.log(data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteAnEnquiry = createAsyncThunk(
  "api/delete",
  async (id, thunkAPI) => {
    try {
      const response = await enquiryServices.deleteEnquery(id);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateStatus = createAsyncThunk("api/update", async(data, thunkAPI)=>{
  try {
    const response = await enquiryServices.updateEnq(data)
    return response
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

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
      })
      .addCase(deleteAnEnquiry.pending, (state, action) => {
        (state.deletedEnquiry = ""),
          (state.isError = false),
          (state.isLoading = true),
          (state.error = "");
      })
      .addCase(deleteAnEnquiry.fulfilled, (state, action) => {
        (state.deletedEnquiry = action.payload),
          (state.isSuccess = true),
          (state.isError = false),
          (state.isLoading = false),
          (state.error = "");
      })
      .addCase(deleteAnEnquiry.rejected, (state, action) => {
        (state.deletedEnquiry = ""),
          (state.isSuccess = false),
          (state.isError = true),
          (state.isLoading = false),
          (state.error = action.error);
      }).addCase(singleEnquiry.pending, (state, action) => {
        (state.singleEnq = []),
          (state.isError = false),
          (state.isLoading = true),
          (state.error = "");
      })
      .addCase(singleEnquiry.fulfilled, (state, action) => {
        (state.singleEnq = action.payload),
          (state.isSuccess = true),
          (state.isError = false),
          (state.isLoading = false),
          (state.error = "");
      })
      .addCase(singleEnquiry.rejected, (state, action) => {
        (state.singleEnq = []),
          (state.isSuccess = false),
          (state.isError = true),
          (state.isLoading = false),
          (state.error = action.error);
      }).addCase(updateStatus.pending, (state, action) => {
        (state.updatedStatus = ""),
          (state.isError = false),
          (state.isLoading = true),
          (state.error = "");
      })
      .addCase(updateStatus.fulfilled, (state, action) => {
        (state.updatedStatus = action.payload),
          (state.isSuccess = true),
          (state.isError = false),
          (state.isLoading = false),
          (state.error = "");
      })
      .addCase(updateStatus.rejected, (state, action) => {
        (state.updatedStatus = ""),
          (state.isSuccess = false),
          (state.isError = true),
          (state.isLoading = false),
          (state.error = action.error);
      })
      .addCase(revertAll, () => initialState);
  },
});

export default enquirySlice.reducer;
