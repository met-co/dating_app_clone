import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from "../../shared/api/api";
import { authAPI } from "../../shared/api/authAPI";
import { tokenManager } from "../../shared/utils/tokenManeger";
import axios from "axios";

/* Action Type */
export const actionType = {
  user: {
    POST_SIGNUP: "POST_SIGNUP",
    POST_SIGNIN: "POST_SIGNIN",
    GET_USER_INFO: "GET_USER_INFO",
    GET_USERS: "GET_USERS",
    GET_MATCH_USERS: "GET_MATCH_USERS",
    GET_MATCH_ROOM: "GET_MATCH_ROOM",
    GET_USER_FAVORITE: "GET_USER_FAVORITE",
  },
};

///////// 회원가입 thunk ////////////
export const __signup = createAsyncThunk(
  actionType.user.POST_SIGNUP,
  async (user, thunkAPI) => {
    // await gDelay(COMMON_DEALY_TIME);
    console.log(user);
    try {
      const result = await authAPI.post(`/members/signup`, user);
      return thunkAPI.fulfillWithValue(result.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

////// 로그인 //////
export const __signin = createAsyncThunk(
  actionType.user.POST_SIGNIN,
  async (user, thunkAPI) => {
    console.log(user);
    try {
      const result = await authAPI.post("members/login", user);

      //localStorage.setItem("access_token", result.headers.authorization);
      // sessionStorage.setItem("refresh_token", res.headers.authorization);
      return thunkAPI.fulfillWithValue(result.headers.authorization);
    } catch (error) {
      if (400 < error.status < 500) {
        alert(error.response.data.message);
      }
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//정상

//이상
// 403 에러 (권한 없음)
const token2 =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIwMTAxMTExMjIyMiIsImV4cCI6MTY3NTE3NjUxNCwiaWF0IjoxNjc1MTcyOTE0fQ.pqA8TFMUH55i1dOOZgZ_bj9TXF0NZublZsFbp2bHmdc";

//99998888
//200 뜨고 response도 잘 받아오나 데이터 렌더링 불가함
const token3 =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIwMTA5OTk5ODg4OCIsImV4cCI6MTY3NTE3ODgxMSwiaWF0IjoxNjc1MTc1MjExfQ._6FI0ODrm3HnIyvij2Ix0b_V1-1niZyNVmCfSLNXQzY";

const token = localStorage.getItem("access-token");

///////// 전체 유저 조회 thunk,GET ///////////////////
export const __getUsersThunk = createAsyncThunk(
  actionType.user.GET_USERS,
  async (_, thunkAPI) => {
    try {
      client.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const result = await client.get(
        process.env.REACT_APP_BASE_URL + `/members`
      );
      return thunkAPI.fulfillWithValue(result.data);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

///////// 매치된 유저 전체 조회 thunk,GET ///////////////////
export const __getMatchUsersThunk = createAsyncThunk(
  actionType.user.GET_MATCH_USERS,
  async (_, thunkAPI) => {
    try {
      console.log("bye");
      client.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const result = await client.get(
        process.env.REACT_APP_BASE_URL + `/matching`
      );
      return thunkAPI.fulfillWithValue(result.data);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

///////// 매치된 유저 상세페이지 thunk,GET ///////////////////
export const __getMatchRoomThunk = createAsyncThunk(
  actionType.user.GET_MATCH_ROOM,
  async (roomId, thunkAPI) => {
    try {
      console.log(roomId);
      const result = await client.get(
        `profile/${roomId}`
        // {
        //   headers: {
        //     "Content-Type": "application/json",
        //     Authorization: token,
        //   },
        // },
        // { withCredentials: true }
      );
      return thunkAPI.fulfillWithValue(result.data);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

/////////// 좋아요 누르기 /////////////////
export const __userFavorite = createAsyncThunk(
  actionType.user.GET_USER_FAVORITE,
  async (id, thunkAPI) => {
    try {
      const result = await client.patch(
        `like/${id}`
        // {
        //   headers: {
        //     "Content-Type": "application/json",
        //     Authorization: token,
        //   },
        // },
        // { withCredentials: true }
      );
      return thunkAPI.fulfillWithValue(result.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

/* initialState*/
const initialState = {
  users: [],
  matchUsers: [],
  matchRooms: [],
  isSuccess: false,
  isLoading: false,
  error: null,
};

/* slice */
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    __userReset: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // 전체 유저 조회
      .addCase(__getUsersThunk.pending, (state) => {
        state.isSuccess = false;
        state.isLoading = true;
      })
      .addCase(__getUsersThunk.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.users = action.payload.content;
      })
      .addCase(__getUsersThunk.rejected, (state, action) => {
        state.isSuccess = false;
        state.isLoading = false;
        state.error = action.payload;
      })

      // 매치된 유저 조회
      .addCase(__getMatchUsersThunk.pending, (state) => {
        state.isSuccess = false;
        state.isLoading = true;
      })
      .addCase(__getMatchUsersThunk.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.matchUsers = action.payload;
      })
      .addCase(__getMatchUsersThunk.rejected, (state, action) => {
        state.isSuccess = false;
        state.isLoading = false;
        state.error = action.payload;
      })

      //매치된 유저 상세페이지//
      .addCase(__getMatchRoomThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__getMatchRoomThunk.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.matchRooms = action.payload;
      })
      .addCase(__getMatchRoomThunk.rejected, (state, action) => {
        state.isSuccess = false;
        state.isLoading = false;
        state.error = action.payload;
      })
      //좋아요 누르기//
      .addCase(__userFavorite.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__userFavorite.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(__userFavorite.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      //회원 가입//
      .addCase(__signup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__signup.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        console.log(action);
      })
      .addCase(__signup.rejected, (state, action) => {
        state.isSuccess = false;
        state.isLoading = false;
        state.error = action.payload.response.data.errorMessage;
      })
      //로그인//
      .addCase(__signin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__signin.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        tokenManager.token = action.payload;
      })
      .addCase(__signin.rejected, (state, action) => {
        state.isSuccess = false;
        state.isLoading = false;
        state.error = action.payload.response.data.errorMessage;
      });
  },
});

export const { __userReset } = userSlice.actions;
export default userSlice.reducer;
