import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { blogServices } from "./blogServices";

const initialState = {
  blogs: [],
  isError: false,
  message: "",
  isSuccesfull: false,
  isLoading: false,
  error: null,
  createdBlog: "",
};

export const revertAll = createAction('Reset_all')

export const BlogsThunk = createAsyncThunk("api/blogs", async (thunkAPI) => {
  try {
    return await blogServices.fetchB();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const blogPost = createAsyncThunk("api/blog", async (data, thunkAPI) => {
  try {
    return await blogServices.createBlog(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
export const BlogCategories = createAsyncThunk(
  "api/blogs/categories",
  (thunkAPI) => {
    try {
    } catch (error) {
      thunkAPI.rejectWithValue(error.message);
    }
  }
);

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder
      .addCase(BlogsThunk.pending, (state, action) => {
        (state.blogs = ""),
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
        (state.blogs = ""),
          (state.isError = true),
          (state.message = action.error),
          (state.isSuccesfull = false),
          (state.isLoading = false),
          (state.error = action.payload);
      })
      .addCase(blogPost.pending, (state, action) => {
        (state.isLoading = true),
          (state.isError = false),
          (state.isSuccesfull = false);
      })
      .addCase(blogPost.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.isSuccesfull = true),
          (state.isError = false),
          (state.createdBlog = action.payload);
      })
      .addCase(blogPost.rejected, (state, action) => {
        (state.isLoading = false),
          (state.isSuccesfull = false),
          (state.isError = true),
          (state.error = action.error);
      }).addCase(revertAll, ()=> initialState)
  },
});

export default blogSlice.reducer;
