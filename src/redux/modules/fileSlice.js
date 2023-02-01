import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { authAPI } from "../../shared/api/authAPI";

export const actionType = {
  file: {
    POST_PROFILE_IMAGE: "POST_PROFILE_IMAGE",
  },
};

const initialState = {
  isLoading: false,
  error: null,
  fileData: {},
};

// 회원가입 할 때 프로필 이미지 업로드
export const __profileImageUpload = createAsyncThunk(
  actionType.file.POST_PROFILE_IMAGE,
  async (file, thunkAPI) => {
    try {
      const result = await authAPI.post(`/upload`, file, {
        params: {
          category: "image",
        },
      });
      return thunkAPI.fulfillWithValue(result.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const fileSlice = createSlice({
  name: "file",
  initialState,
  reducers: {
    __fileReset: (state, action) => {
      state.fileData = {};
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // 회원가입 할 때 프로필 업로드
      .addCase(__profileImageUpload.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__profileImageUpload.fulfilled, (state, action) => {
        state.isLoading = false;
        state.fileData = action.payload;
      })
      .addCase(__profileImageUpload.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { __fileReset } = fileSlice.actions;
export default fileSlice.reducer;
