import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { blogServices } from "./blogServices";

const initialState = {
  blogs: [],
  isError: false,
  message: "",
  isSuccesfull: false,
  isLoading: false,
  error: null,
};

export const BlogsThunk = createAsyncThunk("api/blogs", async (thunkAPI) => {
  try {
    return await blogServices.fetchB();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder
      .addCase(BlogsThunk.pending, (state, action) => {
        (state.blogs = []),
          (state.isError = false),
          (state.message = ""),
          (state.isSuccesfull = false),
          (state.isLoading = true),
          (state.error = null);
      })
      .addCase(BlogsThunk.fulfilled, (state, action) => {
        (state.blogs = action.payload),
          (state.isError = false),
          (state.message = ""),
          (state.isSuccesfull = true),
          (state.isLoading = false),
          (state.error = null);
      })
      .addCase(BlogsThunk.rejected, (state, action) => {
        (state.blogs = []),
          (state.isError = true),
          (state.message = action.error),
          (state.isSuccesfull = false),
          (state.isLoading = false),
          (state.error = action.payload);
      });
  },
});

export default blogSlice.reducer;
