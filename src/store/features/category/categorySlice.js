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
      });
  },
});

export default categorySlice.reducer;
