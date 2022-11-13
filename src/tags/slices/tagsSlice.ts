import { createSlice } from "@reduxjs/toolkit";

const initialState: { postTagNames: string[]; tags: [] } = {
  postTagNames: [],
  tags: [],
};

export const tagsSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {
    setNewTag: (state, action: { payload: string }) => {
      state.postTagNames.push(action.payload);
    },
    setTags: (state, action: { payload: string[] }) => {
      state.postTagNames = action.payload;
    },
    removeTag: (state, action: { payload: string }) => {
      state.postTagNames = state.postTagNames.filter(
        (s) => s !== action.payload
      );
    },
    resetTags: (state) => {
      state.postTagNames = [];
    },
  },
});

export const { setNewTag, removeTag, resetTags, setTags } = tagsSlice.actions;

export default tagsSlice.reducer;
