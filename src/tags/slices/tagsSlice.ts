import { createSlice } from "@reduxjs/toolkit";

const initialState: { tagNames: string[] } = {
  tagNames: [],
};

export const tagsSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {
    setNewTag: (state, action: { payload: string }) => {
      state.tagNames.push(action.payload);
    },
    setTags: (state, action: { payload: string[] }) => {
      state.tagNames = action.payload;
    },
    removeTag: (state, action: { payload: string }) => {
      state.tagNames = state.tagNames.filter((s) => s !== action.payload);
    },
    resetTags: (state) => {
      state.tagNames = [];
    },
  },
});

export const { setNewTag, removeTag, resetTags, setTags } = tagsSlice.actions;

export default tagsSlice.reducer;
