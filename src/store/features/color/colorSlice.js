import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import colorServices from "./colorServices";

const initialState = {
  color: [],
  isLoading: false,
  isError: false,
  error: "",
  isSuccessfull: false,
  createdColor: [],
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

export const createColor = createAsyncThunk("api/color/create", async(data, thunkAPI)=>{
try {
  const response = await colorServices.createColor(data)
  return response;
} catch (error) {
  return thunkAPI.rejectWithValue(error.message)
}
})
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
      }).addCase(createColor.pending, (state, action)=>{
        state.isLoading = true,
        state.isSuccessfull = false
      }).addCase(createColor.fulfilled, (state, action)=>{
        state.isLoading = false,
        state.isSuccessfull = true,
        state.createdColor = action.payload
      }).addCase(createColor.rejected, (state, action)=>{
        state.isLoading = false,
        state.isSuccessfull = false,
        state.isError = true,
        state.error = action.error
      })
  },
});

export default colorSlice.reducer;
