import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BlogsThunk } from "../blog/blogSlice";
import { blogCategory } from "./blogCatServices";

const initialState = {
  blogcatt: "",
  isLoading: false,
  isSuccess: false,
  message: "",
  isError: false,
  error: null,
  createdBCat: ""
};

export const revertAll = createAction('Reset_all')

export const getBlogCategories = createAsyncThunk(
  "/api/blogcat",
  async (thunkAPI) => {
    try {
      return await blogCategory.fetchBlogCategory();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const createBCat = createAsyncThunk(
  "/api/createblogcat",
  async (data, thunkAPI) => {
    try {
      const data2 = await blogCategory.createBlogCat(data);
      console.log(data2, "this is the data")
      return data2
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
const blogCatSlice = createSlice({
  name: "blogCats",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getBlogCategories.pending, (state, action) => {
        (state.isLoading = true),
          (state.blogcatt = ""),
          (state.isSuccess = false),
          (state.isError = false),
          (state.error = null);
      })
      .addCase(getBlogCategories.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.blogcatt = action.payload),
          (state.isSuccess = true),
          (state.isError = false),
          (state.error = null);
      })
      .addCase(getBlogCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.blogcatt = "";
        state.isSuccess = false;
        state.isError = true;
        state.error = action.error;
      })
      .addCase(createBCat.pending, (state, action) => {
        (state.isLoading = true),
          (state.isError = false),
          (state.isSuccess = false),
          (state.createdBCat = "");
      })
      .addCase(createBCat.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.isError = false),
          (state.createdBCat = action.payload),
          (state.isSuccess = true);
      })
      .addCase(createBCat.rejected, (state, action) => {
        (state.isLoading = false),
          (state.isError = true),
          (state.createdBCat = ""),
          (state.isSuccess = false)((state.error = action.error));
      })
      .addCase(revertAll, () => initialState);
  },
});

export default blogCatSlice.reducer;
