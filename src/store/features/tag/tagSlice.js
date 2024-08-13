import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TagServices } from "./tagServices";
const initialState = {
  tags: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
  error: null,
  addedTag: null,
  oneTag: "",
  updatedTag: "",
  deletedTag: "",
};

export const createTag = createAsyncThunk(
  "api/tags",
  async (data, thunkAPI) => {
    try {
      return TagServices.addTag(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateTag = createAsyncThunk("update/tag", async (data, thunkAPI)=>{
    try{
    return await TagServices.updateTag(data)
    }catch(error){
    return thunkAPI.rejectWithValue(error)
    }
    })

export const getOneTagName = createAsyncThunk(
  "get-oneTag",
  async (id, thunkAPI) => {
    try {
      return await TagServices.getSingleTag(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getTags = createAsyncThunk("api/tag/", async (thunkAPI) => {
    try {
      const data = await TagServices.getTags();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  });

  export const deleteTag = createAsyncThunk("delete-tag", async(id, thunkAPI)=>{
    return await TagServices.deleteTag(id)
  })

  
export const revertAll = createAction("Revert_all");

const tagSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTags.pending, (state, action) => {
        (state.tags = []),
          (state.isError = false),
          (state.isLoading = true),
          (state.isSuccess = false),
          (state.message = ""),
          (state.error = null);
      })
      .addCase(getTags.fulfilled, (state, action) => {
        (state.tags = action.payload),
          (state.isError = false),
          (state.isLoading = false),
          (state.isSuccess = true),
          (state.message = ""),
          (state.error = null);
        
      })
      .addCase(getTags.rejected, (state, action) => {
        (state.tags = []),
          (state.isError = true),
          (state.isLoading = false),
          (state.isSuccess = false),
          (state.message = action.error),
          (state.error = action.error);
      })
      .addCase(createTag.pending, (state, action) => {
        (state.isLoading = true),
          (state.isSuccess = false),
          (state.addedTag = "");
      })
      .addCase(createTag.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.isError = false),
          (state.isSuccess = true),
          (state.addedTag = action.payload);
      })
      .addCase(createTag.rejected, (state, action) => {
        (state.isLoading = false), (state.addedTag = "");
        (state.isError = true),
          (state.isSuccess = false),
          (state.error = action.error);
      }).addCase(getOneTagName.pending, (state, action) => {
        (state.oneTag = ""),
          (state.isError = false),
          (state.isLoading = true),
          (state.isSuccess = false),
          (state.message = ""),
          (state.error = null);
      })
      .addCase(getOneTagName.fulfilled, (state, action) => {
        (state.oneTag = action.payload),
          (state.isError = false),
          (state.isLoading = false),
          (state.isSuccess = true),
          (state.message = ""),
          (state.error = null);
        console.log(action.payload);
      })
      .addCase(getOneTagName.rejected, (state, action) => {
        (state.oneTag = ""),
          (state.isError = true),
          (state.isLoading = false),
          (state.isSuccess = false),
          (state.message = action.error),
          (state.error = action.error);
      }).addCase(updateTag.pending, (state, action) => {
        (state.updatedTag = ""),
          (state.isError = false),
          (state.isLoading = true),
          (state.isSuccess = false),
          (state.message = ""),
          (state.error = null);
      })
      .addCase(updateTag.fulfilled, (state, action) => {
        (state.updatedTag = action.payload),
          (state.isError = false),
          (state.isLoading = false),
          (state.isSuccess = true),
          (state.message = ""),
          (state.error = null);
        console.log(action.payload);
      })
      .addCase(updateTag.rejected, (state, action) => {
        (state.updatedTag = ""),
          (state.isError = true),
          (state.isLoading = false),
          (state.isSuccess = false),
          (state.message = action.error),
          (state.error = action.error);
      }).addCase(deleteTag.pending, (state, action) => {
        (state.deletedTag = ""),
          (state.isError = false),
          (state.isLoading = true),
          (state.isSuccess = false),
          (state.message = ""),
          (state.error = null);
      })
      .addCase(deleteTag.fulfilled, (state, action) => {
        (state.deletedTag = action.payload),
          (state.isError = false),
          (state.isLoading = false),
          (state.isSuccess = true),
          (state.message = ""),
          (state.error = null);
        console.log(action.payload);
      })
      .addCase(deleteTag.rejected, (state, action) => {
        (state.deletedTag = ""),
          (state.isError = true),
          (state.isLoading = false),
          (state.isSuccess = false),
          (state.message = action.error),
          (state.error = action.error);
      })
      .addCase(revertAll, () => initialState);
  },
});

export default tagSlice.reducer;
