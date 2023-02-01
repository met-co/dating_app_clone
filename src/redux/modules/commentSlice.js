import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { client } from "../../shared/api/api";

export const actionType = {
  comment: {
    GET_COMMENTS_BY_PRODUCT_ID: "GET_COMMENTS_BY_PRODUCT_ID",
    POST_COMMENT: "POST_COMMENT",
    DELETE_COMMENT: "DELETE_COMMENT",
    MODIFY_COMMENT: "MODIFY_COMMENT",
  },
};

//정상 (1번 회원)
const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIwMTUiLCJleHAiOjE2NzUyMjUyODQsImlhdCI6MTY3NTIyMTY4NH0.qDM-nWNe9eGwTEfyzoFmO-bX95fLXODAd9eTlmE8b-4";

/* 댓글 조회 */
export const __getComments = createAsyncThunk(
  actionType.comment.GET_COMMENTS_BY_PRODUCT_ID,
  async (roomId, thunkAPI) => {
    try {
      console.log(roomId);
      const result = await client.get(
        `/comments/${roomId}`
        // {
        //   headers: {
        //     "Content-Type": "application/json",
        //     Authorization: token,
        //   },
        //   // params: {
        //   //   page: "1",
        //   //   size: "100",
        //   // },
        // },
        // { withCredentials: true }
      );
      console.log(result.data);
      return thunkAPI.fulfillWithValue(result.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

/* 댓글 작성 */
export const __submitComment = createAsyncThunk(
  actionType.comment.POST_COMMENT,
  async (commentData, thunkAPI) => {
    try {
      const result = await client.post(
        `/comments`,
        commentData
        // {
        //   headers: {
        //     "Content-Type": "application/json",
        //     Authorization: token,
        //   },
        //   // params: {
        //   //   page: "1",
        //   //   size: "100",
        //   // },
        // },
        // { withCredentials: true }
      );
      return thunkAPI.fulfillWithValue(result.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

/* 댓글 삭제 */
export const __deleteComment = createAsyncThunk(
  actionType.comment.DELETE_COMMENT,
  async (commentId, thunkAPI) => {
    try {
      let result = await axios.delete(`/comments/${commentId}`);
      return thunkAPI.fulfillWithValue(commentId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

/* 댓글 수정 */
export const __modifyComment = createAsyncThunk(
  actionType.comment.MODIFY_COMMENT,
  async (payload, thunkAPI) => {
    try {
      console.log(payload);
      const result = await client.patch(
        `/comments/${payload.commentId}`,
        {
          content: payload.comment,
        }
        //   `http://13.209.85.54:8080/comments/${payload.commentId}`,
        //   { content: payload.content },
        //   {
        //     headers: {
        //       "Content-Type": "application/json",
        //       Authorization: token,
        //     },
        //   },
        //   { withCredentials: true }
      );
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  isSuccess: false,
  isLoading: false,
  error: null,
  comments: [],
};

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 댓글 조회
      .addCase(__getComments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__getComments.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.comments = action.payload;
      })
      .addCase(__getComments.rejected, (state, action) => {
        state.isSuccess = false;
        state.isLoading = false;
        state.error = action.payload.response.data.errorMessage;
      })
      // 댓글 작성
      .addCase(__submitComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__submitComment.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;

        const comment = action.payload;
        console.log(comment);
        comment.status = true;
        // 내가 작성한 것 (true)으로 변경
        state.comments = [...state.comments, comment];
        // 댓글을 작성했을때 화면에 바로 보이게 하기
        // 새로고침 해서 렌더링 되는것은 의미없음
        // post 했을때 추가된 값이 response로 내려옴
        // 댓글 조회하는 배열에 추가함 (배열이 변경되어서 스스로 렌더링 -> 리로드)
      })
      .addCase(__submitComment.rejected, (state, action) => {
        state.isSuccess = false;
        state.isLoading = false;
        state.error = action.payload.response.data.errorMessage;
      })
      // 댓글 삭제
      .addCase(__deleteComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__deleteComment.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.comments = state.comments.filter(
          (comment) => comment.commentId !== action.payload
        );
      })
      .addCase(__deleteComment.rejected, (state, action) => {
        state.isSuccess = false;
        state.isLoading = false;
        state.error = action.payload.response.data.errorMessage;
      })
      // 댓글 수정
      .addCase(__modifyComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__modifyComment.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.comments = [...state.comments].map((comment) => {
          if (comment.commentId === action.payload.commentId) {
            const newComment = comment;
            newComment.comment = action.payload.comment;
            return newComment;
          }

          return comment;
        });
      })
      .addCase(__modifyComment.rejected, (state, action) => {
        state.isSuccess = false;
        state.isLoading = false;
        state.error = action.payload.response.data.errorMessage;
      });
  },
});

export const {} = commentSlice.actions;
export default commentSlice.reducer;
