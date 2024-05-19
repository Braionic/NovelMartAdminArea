import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BlogsThunk } from "../blog/blogSlice";
import { blogCategory } from "./blogCatServices";

const initialState = {
  blogcatt: [],
  isLoading: false,
  isSuccess: false,
  message: "",
  isError: true,
  error: null,
};

export const getBlogCategories = createAsyncThunk("/api/blogcat", async (thunkAPI) => {
  try {
    return await blogCategory.fetchBlogCategory();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const blogCatSlice = createSlice({
  name: "blogCats",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getBlogCategories.pending, (state, action) => {
      (state.isLoading = true),
        (state.blogcatt = []),
        (state.isSuccess = false),
        (state.isError = false),
        (state.error = null);
    }).addCase(getBlogCategories.fulfilled, (state, action)=>{
        (state.isLoading = false),
        (state.blogcatt = action.payload),
        (state.isSuccess = true),
        (state.isError = false),
        (state.error = null);
    }).addCase(getBlogCategories.rejected, (state, action)=>{
        state.isLoading = false;
        state.blogcatt = action.payload;
        state.isSuccess = false;
        state.isError = true;
        state.error = action.error;
        
    })
  },
});

export default blogCatSlice.reducer;
