import { createSlice } from "@reduxjs/toolkit";
import { AccountViewDto } from "../../accounts/types/account-view-dto";
import { CreatedReplyDto } from "../components/ReplyToComment";
import { CommentViewDto } from "../types/comment-view.dto";

type NewComment = {
  id: string;
  author: AccountViewDto;
  content: string;
  created_at: string;
  updated_at: string;
};

export type CommentTree = {
  baseComment: CommentViewDto | null;
  commentReplies: CommentViewDto[];
};

const initialState: {
  postComments: CommentViewDto[];
  commentTree: CommentTree;
  commentViewHistory: CommentViewDto[];
} = {
  postComments: [],
  commentTree: { baseComment: null, commentReplies: [] },
  commentViewHistory: [],
};

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    setPostComments: (state, action: { payload: CommentViewDto[] }) => {
      state.postComments = action.payload;
    },
    resetPostComments: (state) => {
      state.postComments = [];
    },
    addNewCommentIntoPost: (
      state,
      action: {
        payload: NewComment;
      }
    ) => {
      const data: CommentViewDto = {
        ...action.payload,
        like_count: 0,
        dislike_count: 0,
        reply_count: 0,
        liked_by: false,
        disliked_by: false,
      };

      state.postComments.push(data);
    },
    removeCommentFromPost: (state, action: { payload: string }) => {
      state.postComments = state.postComments.filter(
        (s) => s.id !== action.payload
      );
    },
    removeCommentExpressionInPost: (
      state,
      action: { payload: { id: string; exp: "like" | "dislike" } }
    ) => {
      const { id, exp } = action.payload;

      const comment = state.postComments.find((c) => c.id === id);

      if (comment) {
        comment[`${action.payload.exp}d_by`] = false;
        comment[`${action.payload.exp}_count`]--;
      }
    },
    leaveExpressionToPostComment: (
      state,
      action: { payload: { id: string; type: "like" | "dislike" } }
    ) => {
      const { id, type } = action.payload;

      const comment = state.postComments.find((c) => c.id === id);

      if (comment) {
        comment[`${type}_count`]++;
        comment[`${type}d_by`] = true;
      }
    },
    resetCommentTree: (state) => {
      state.commentTree = { baseComment: null, commentReplies: [] };
    },
    resetCommentViewHistory: (state) => {
      state.commentViewHistory = [];
    },
    getPreviousComment: (state) => {
      state.commentViewHistory.pop();

      state.commentTree.baseComment =
        state.commentViewHistory[state.commentViewHistory.length - 1] || null;

      if (!state.commentTree.baseComment) {
        state.commentTree.commentReplies = [];
      }
    },
    setBaseComment: (state, action: { payload: CommentViewDto }) => {
      state.commentTree.baseComment = action.payload;

      state.commentViewHistory.push(action.payload);
    },
    setRepliesToCommentTree: (state, action: { payload: CommentViewDto[] }) => {
      if (state.commentTree?.baseComment) {
        state.commentTree.commentReplies = action.payload;
      }
    },
    addBaseCommentToHistory: (
      state,
      action: {
        payload: CommentViewDto;
      }
    ) => {
      const i = state.commentViewHistory.findIndex(
        (c) => c.id === action.payload.id
      );

      if (i === -1) {
        state.commentViewHistory.push(action.payload);
      }
    },
    addCommentIntoTree: (
      state,
      action: {
        payload: {
          comment: NewComment;
          parentID: string;
        };
      }
    ) => {
      const { parentID, comment } = action.payload;

      const newComment: CommentViewDto = {
        ...comment,
        like_count: 0,
        dislike_count: 0,
        reply_count: 0,
        liked_by: false,
        disliked_by: false,
      };

      // replied to base comment
      if (parentID === state.commentTree?.baseComment?.id) {
        state.commentTree.baseComment.reply_count++;
        state.commentTree.commentReplies.push(newComment);

        const isParentIsPostComment = state.postComments.find(
          (c) => c.id === parentID
        );

        if (isParentIsPostComment) {
          isParentIsPostComment.reply_count++;
        }
      } else {
        // replied to reply comment
        const replied = state.commentTree.commentReplies.find(
          (c) => c.id === parentID
        );

        if (replied) {
          replied.reply_count++;
          commentsSlice.caseReducers.setBaseComment(state, {
            payload: replied,
          });
        }
      }
    },
    removeCommentFromTree: (state, action: { payload: { id: string } }) => {
      const { id } = action.payload;

      if (state.commentTree?.baseComment) {
        // base comment was deleted
        if (state.commentTree.baseComment.id === id) {
          commentsSlice.caseReducers.resetCommentTree(state);

          state.commentViewHistory = state.commentViewHistory.filter(
            (c) => c.id !== id
          );

          state.postComments = state.postComments.filter((c) => c.id !== id);
        } else {
          state.commentTree.baseComment.reply_count--;

          state.commentTree.commentReplies =
            state.commentTree.commentReplies.filter((c) => c.id !== id);

          const postComment = state.postComments.find(
            (c) => c.id === state.commentTree?.baseComment?.id
          );

          if (postComment) {
            postComment.reply_count--;
          }
        }
      } else {
        state.postComments = state.postComments.filter((c) => c.id !== id);
      }
    },
    updateCommentInTree: (
      state,
      action: {
        payload: {
          id: string;
          content: string;
          created_at: string;
          updated_at: string;
        };
      }
    ) => {
      const { id, content, created_at, updated_at } = action.payload;

      state.commentViewHistory?.map((c) => {
        if (c.id === id) {
          c.content = content;
          c.created_at = created_at;
          c.updated_at = updated_at;
        }
        return c;
      });

      if (
        state.commentTree?.baseComment &&
        state.commentTree.baseComment.id === id
      ) {
        const { baseComment } = state.commentTree;

        baseComment.content = content;
        baseComment.created_at = created_at;
        baseComment.updated_at = updated_at;
      }

      state.commentTree?.commentReplies?.map((r) => {
        if (r.id === id) {
          r.content = content;
          r.created_at = created_at;
          r.updated_at = updated_at;
        }
        return r;
      });

      state.postComments.map((c) => {
        if (c.id === id) {
          c.content = content;
          c.created_at = created_at;
          c.updated_at = updated_at;
        }
        return c;
      });
    },
    leaveExpressionCommentInTree: (
      state,
      action: { payload: { id: string; type: "like" | "dislike" } }
    ) => {
      const { id, type } = action.payload;

      const inView = state.commentViewHistory.find((c) => c.id === id);

      if (inView) {
        inView[`${type}_count`]++;
        inView[`${type}d_by`] = true;
      }

      if (
        state.commentTree?.baseComment &&
        state.commentTree.baseComment.id === action.payload.id
      ) {
        state.commentTree.baseComment[`${type}_count`]++;
        state.commentTree.baseComment[`${type}d_by`] = true;
      }

      const inTree = state.commentTree?.commentReplies.find((r) => r.id === id);

      if (inTree) {
        inTree[`${type}_count`]++;
        inTree[`${type}d_by`] = true;
      }

      commentsSlice.caseReducers.leaveExpressionToPostComment(state, {
        payload: { id, type },
      });
    },

    removeReplyExpressionInTree: (
      state,
      action: { payload: { id: string; exp: "like" | "dislike" } }
    ) => {
      const { id } = action.payload;

      const inView = state.commentViewHistory.find((c) => c.id === id);

      if (inView) {
        inView[`${action.payload.exp}d_by`] = false;
        inView[`${action.payload.exp}_count`]--;
      }

      if (
        state.commentTree?.baseComment &&
        state.commentTree.baseComment.id === id
      ) {
        state.commentTree.baseComment[`${action.payload.exp}d_by`] = false;
        state.commentTree.baseComment[`${action.payload.exp}_count`]--;
      }

      const inTree = state.commentTree?.commentReplies.find((r) => r.id === id);

      if (inTree) {
        inTree[`${action.payload.exp}d_by`] = false;
        inTree[`${action.payload.exp}_count`]--;
      }

      const inPostComments = state.postComments.find((r) => r.id === id);

      if (inPostComments) {
        inPostComments[`${action.payload.exp}d_by`] = false;
        inPostComments[`${action.payload.exp}_count`]--;
      }
    },
  },
});

export const {
  setPostComments,
  addNewCommentIntoPost,
  removeCommentFromPost,
  resetPostComments,
  addBaseCommentToHistory,
  setBaseComment,
  setRepliesToCommentTree,
  getPreviousComment,
  resetCommentTree,
  removeReplyExpressionInTree,
  resetCommentViewHistory,
  addCommentIntoTree,
  removeCommentFromTree,
  updateCommentInTree,
  removeCommentExpressionInPost,
  leaveExpressionToPostComment,
  leaveExpressionCommentInTree,
} = commentsSlice.actions;

export default commentsSlice.reducer;
