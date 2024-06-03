import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import colorServices from "./colorServices";

const initialState = {
  color: [],
  isLoading: false,
  isError: false,
  error: "",
};

export const getColors = createAsyncThunk("api/color/", async (_, thunkAPI) => {
  try {
    const result = await colorServices.getColors();
    console.log(result)
    return result
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
const colorSlice = createSlice({
  name: "color",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getColors.pending, (state, action) => {
        (state.color = []),
          (state.isLoading = true),
          (state.isError = false),
          (state.error = "");
      })
      .addCase(getColors.fulfilled, (state, action) => {
        (state.color = action.payload),
          (state.isLoading = false),
          (state.isError = false),
          (state.error = "");
      })
      .addCase(getColors.rejected, (state, action) => {
        (state.color = []),
          (state.isLoading = false),
          (state.isError = true),
          (state.error = action.error);
      });
  },
});

export default colorSlice.reducer;
