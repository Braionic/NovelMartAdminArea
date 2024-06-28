import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import imageServices from "./imageServices";

const initialState = {
  images: [],
  isLoading: false,
  error: "",
  isError: false,
};

export const removeImage = createAsyncThunk(
  "api/upload/delete",
  async (id, thunkAPI) => {
    try {
      return await imageServices.deleteImage(id);
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const uploadImg = createAsyncThunk(
  "api/upload/",
  async (files, thunkAPI) => {
    try {
      const formData = new FormData();
      for (let index = 0; index < files.length; index++) {
        formData.append("images", files[index]);
      }
      console.log(formData);
      const data = await imageServices.uploadImages(formData);
      console.log(data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
const imgSlice = createSlice({
  name: "images",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(uploadImg.pending, (state, action) => {
        (state.images = []),
          (state.isError = false),
          (state.isLoading = true),
          (state.error = "");
      })
      .addCase(uploadImg.fulfilled, (state, action) => {
        (state.images = action.payload),
          (state.isError = false),
          (state.isLoading = false),
          (state.error = "");
      })
      .addCase(uploadImg.rejected, (state, action) => {
        (state.isError = true),
          (state.isLoading = false),
          (state.error = action.error?.message);
      })
      .addCase(removeImage.pending, (state, action) => {
        (state.images = []),
          (state.isError = false),
          (state.isLoading = true),
          (state.error = "");
      })
      .addCase(removeImage.fulfilled, (state, action) => {
       state.isLoading = false,
       state.images = []
      })
      .addCase(removeImage.rejected, (state, action) => {
        (state.isError = true),
          (state.error = action.error),
          (state.isLoading = false);
      });
  },
});

export default imgSlice.reducer;
