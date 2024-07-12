import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { brandServices } from "./brandServices";

const initialState = {
  brands: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
  error: null,
  addedBrand: null,
  oneBrand: "",
  updatedBrand: "",
  deletedBrand: ""
};


export const revertAll = createAction('Reset_all')

export const createBrand = createAsyncThunk(
  "api/brands",
  async (data, thunkAPI) => {
    try {
      return brandServices.addBrand(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getOneBrandName = createAsyncThunk("get-oneBrand", async(id, thunkAPI)=>{
try {
  return await brandServices.getSingleBrand(id)
} catch (error) {
  return thunkAPI.rejectWithValue(error)
}
})

export const getBrands = createAsyncThunk("api/brand/", async (thunkAPI) => {
  try {
    const data = await brandServices.getBrands();
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const updateBrand = createAsyncThunk("update/brand", async (data, thunkAPI)=>{
try{
return await brandServices.updateBrand(data)
}catch(error){
return thunkAPI.rejectWithValue(error)
}
})

export const deleteBrand = createAsyncThunk("delete-brand", async(id, thunkAPI)=>{
  return await brandServices.deleteBrand(id)
})

const brandSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBrands.pending, (state, action) => {
        (state.brands = []),
          (state.isError = false),
          (state.isLoading = true),
          (state.isSuccess = false),
          (state.message = ""),
          (state.error = null);
      })
      .addCase(getBrands.fulfilled, (state, action) => {
        (state.brands = action.payload),
          (state.isError = false),
          (state.isLoading = false),
          (state.isSuccess = true),
          (state.message = ""),
          (state.error = null);
        console.log(action.payload);
      })
      .addCase(getBrands.rejected, (state, action) => {
        (state.brands = []),
          (state.isError = true),
          (state.isLoading = false),
          (state.isSuccess = false),
          (state.message = action.error),
          (state.error = action.error);
      })
      .addCase(createBrand.pending, (state, action) => {
        (state.isLoading = true),
          (state.isSuccess = false),
          (state.addedBrand = "");
      })
      .addCase(createBrand.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.isError = false),
          (state.isSuccess = true),
          (state.addedBrand = action.payload);
      })
      .addCase(createBrand.rejected, (state, action) => {
        (state.isLoading = false), (state.addedBrand = "");
        (state.isError = true),
          (state.isSuccess = false),
          (state.error = action.error);
      }).addCase(getOneBrandName.pending, (state, action) => {
        (state.oneBrand = ""),
          (state.isError = false),
          (state.isLoading = true),
          (state.isSuccess = false),
          (state.message = ""),
          (state.error = null);
      })
      .addCase(getOneBrandName.fulfilled, (state, action) => {
        (state.oneBrand = action.payload),
          (state.isError = false),
          (state.isLoading = false),
          (state.isSuccess = true),
          (state.message = ""),
          (state.error = null);
        console.log(action.payload);
      })
      .addCase(getOneBrandName.rejected, (state, action) => {
        (state.oneBrand = ""),
          (state.isError = true),
          (state.isLoading = false),
          (state.isSuccess = false),
          (state.message = action.error),
          (state.error = action.error);
      }).addCase(updateBrand.pending, (state, action) => {
        (state.updatedBrand = ""),
          (state.isError = false),
          (state.isLoading = true),
          (state.isSuccess = false),
          (state.message = ""),
          (state.error = null);
      })
      .addCase(updateBrand.fulfilled, (state, action) => {
        (state.updatedBrand = action.payload),
          (state.isError = false),
          (state.isLoading = false),
          (state.isSuccess = true),
          (state.message = ""),
          (state.error = null);
        console.log(action.payload);
      })
      .addCase(updateBrand.rejected, (state, action) => {
        (state.updatedBrand = ""),
          (state.isError = true),
          (state.isLoading = false),
          (state.isSuccess = false),
          (state.message = action.error),
          (state.error = action.error);
      }).addCase(deleteBrand.pending, (state, action) => {
        (state.deletedBrand = ""),
          (state.isError = false),
          (state.isLoading = true),
          (state.isSuccess = false),
          (state.message = ""),
          (state.error = null);
      })
      .addCase(deleteBrand.fulfilled, (state, action) => {
        (state.deletedBrand = action.payload),
          (state.isError = false),
          (state.isLoading = false),
          (state.isSuccess = true),
          (state.message = ""),
          (state.error = null);
        console.log(action.payload);
      })
      .addCase(deleteBrand.rejected, (state, action) => {
        (state.deletedBrand = ""),
          (state.isError = true),
          (state.isLoading = false),
          (state.isSuccess = false),
          (state.message = action.error),
          (state.error = action.error);
      })
      .addCase(revertAll, () => initialState);
  },
});

export default brandSlice.reducer;
