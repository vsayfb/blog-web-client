import { createSlice } from "@reduxjs/toolkit";
import { PostViewDto } from "../types/post-view.dto";

export type SavedPost = {
  title: string;
  url: string;
  id: string;
  published: boolean;
  content: string;
  tags: { id: string; name: string; created_at: string; updated_at: string }[];
  author: {
    id: string;
    displayName: string;
    username: string;
    image: string | null;
  };
  title_image: File | string | null;
  created_at: string;
  updated_at: string;
};

const initialState: {
  savedPost: SavedPost | null;
} = {
  savedPost: null,
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setSavedPost: (state, action: { payload: PostViewDto | null }) => {
      state.savedPost = action.payload;
    },
    addTitleImageToSavedPost: (
      state,
      action: { payload: File | string | null }
    ) => {
      if (state.savedPost) {
        state.savedPost.title_image = action.payload;
      }
    },

    updateSavedPost: (state, action) => {
      state.savedPost = { ...state.savedPost, ...action.payload };
    },
    resetSavedPost: (state) => {
      state.savedPost = null;
    },
  },
});

export const {
  setSavedPost,
  addTitleImageToSavedPost,
  updateSavedPost,
  resetSavedPost,
} = postsSlice.actions;

export default postsSlice.reducer;
