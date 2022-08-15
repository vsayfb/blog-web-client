import { createSlice } from "@reduxjs/toolkit";
import { PostViewDto } from "../../lib/types/post";

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
  },
});

export const { setSavedPost } = postsSlice.actions;

export default postsSlice.reducer;
