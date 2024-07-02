import {
  createSlice,
  asyncThunkCreator,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { categoryServices } from "./categoryServices";

const initialState = {
  categories: [],
  isError: false,
  message: "",
  isSuccesfull: false,
  isLoading: false,
  error: null,
  createdCategory: null
};

export const CategoryThunk = createAsyncThunk(
  "api/blogcategory/",
  async (_, thunkApi) => {
    try {
      return await categoryServices.getCatgories();
    } catch (e) {
      return thunkApi.rejectWithValue(e.message);
    }
  }
);

export const addProductCategory = createAsyncThunk(
  "/productcategory/add",
  async (data, thunkApi) => {
    try {
      const response = await categoryServices.createCategory(data);
      console.log("checkapi", response);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(CategoryThunk.pending, (state, action) => {
        (state.categories = []),
          (state.isError = false),
          (state.message = ""),
          (state.isSuccesfull = false),
          (state.isLoading = true),
          (state.error = null);
      })
      .addCase(CategoryThunk.fulfilled, (state, action) => {
        (state.categories = action.payload),
          (state.isError = false),
          (state.message = ""),
          (state.isSuccesfull = true),
          (state.isLoading = false),
          (state.error = null);
      })
      .addCase(CategoryThunk.rejected, (state, action) => {
        (state.categories = []),
          (state.isError = true),
          (state.message = ""),
          (state.isSuccesfull = false),
          (state.isLoading = false),
          (state.error = action.error);
      })
      .addCase(addProductCategory.pending, (state, action) => {
        (state.isLoading = true), (state.isError = false), (state.error = "");
      }).addCase(addProductCategory.fulfilled, (state, action)=>{
        state.isLoading = false,
        state.isError = false,
        state.error = "",
        state.isSuccesfull = true
        state.createdCategory = action.payload
      }).addCase(addProductCategory.rejected, (state, action)=>{
        state.isError = true,
        state.isSuccesfull = false,
        state.error = action.error
        state.isLoading = false
      })
  },
});

export default categorySlice.reducer;
