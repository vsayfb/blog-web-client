import { createSlice } from "@reduxjs/toolkit";
import { CommentViewDto } from "../types/comment-view.dto";

const initialState: { comments: CommentViewDto[] } = {
  comments: [],
};

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    setComments: (state, action: { payload: CommentViewDto[] }) => {
      state.comments = action.payload;
    },
    addNewComment: (state, action) => {
      state.comments.push(action.payload);
    },
    removeComment: (state, action: { payload: string }) => {
      state.comments = state.comments.filter((s) => s.id !== action.payload);
    },
    resetComments: (state) => {
      state.comments = [];
    },
  },
});

export const { setComments, addNewComment, removeComment, resetComments } =
  commentsSlice.actions;

export default commentsSlice.reducer;
