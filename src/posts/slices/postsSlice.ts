import { createSlice } from "@reduxjs/toolkit";
import { PostViewDto } from "../types/post-view.dto";

const initialState: { savedPost: PostViewDto | null } = {
  savedPost: null,
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setSavedPost: (state, action: { payload: PostViewDto | null }) => {
      state.savedPost = action.payload;
    },
    addTitleImageToPost: (state, action: { payload: string }) => {
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
  addTitleImageToPost,
  updateSavedPost,
  resetSavedPost,
} = postsSlice.actions;

export default postsSlice.reducer;
