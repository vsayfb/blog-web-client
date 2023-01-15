import { createSlice } from "@reduxjs/toolkit";
import { UpdatedPostDto } from "../types/post-view.dto";

const initialState: {
  savedPost: UpdatedPostDto | null;
} = {
  savedPost: null,
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setSavedPost: (state, action: { payload: UpdatedPostDto | null }) => {
      state.savedPost = action.payload;
    },
    addTitleImageToSavedPost: (state, action: { payload: string | null }) => {
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
