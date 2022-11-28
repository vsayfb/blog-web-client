import { createSlice } from "@reduxjs/toolkit";
import { CommentViewDto } from "../types/comment-view.dto";

const initialState: {
  comments: CommentViewDto[];
  replies: { comment: CommentViewDto | null };
  commentViewHistory: CommentViewDto[];
} = {
  comments: [],
  replies: { comment: null },
  commentViewHistory: [],
};

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    setComments: (state, action: { payload: CommentViewDto[] }) => {
      state.comments = action.payload;
    },
    getPreviousComment: (state) => {
      state.commentViewHistory = state.commentViewHistory.filter(
        (_, i) => i !== state.commentViewHistory.length - 1
      );

      state.replies.comment =
        state.commentViewHistory[state.commentViewHistory.length - 1];
    },
    addCommentToHistory: (state, action: { payload: CommentViewDto }) => {
      state.commentViewHistory.push(action.payload);
    },
    showCommentReplies: (state, action: { payload: CommentViewDto }) => {
      state.replies.comment = action.payload;
    },
    hideCommentReplies: (state) => {
      state.replies.comment = null;
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

export const {
  setComments,
  addNewComment,
  removeComment,
  resetComments,
  addCommentToHistory,
  getPreviousComment,
  showCommentReplies,
  hideCommentReplies,
} = commentsSlice.actions;

export default commentsSlice.reducer;
