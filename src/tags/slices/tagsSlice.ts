import { createSlice } from "@reduxjs/toolkit";

const initialState: { tags: string[] } = { tags: [] };

export const tagsSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {
    setNewTag: (state, action: { payload: string }) => {
      state.tags.push(action.payload);
    },
    removeTag: (state, action: { payload: string }) => {
      state.tags = state.tags.filter((s) => s !== action.payload);
    },
    resetTags: (state) => {
      state.tags = [];
    },
  },
});

export const { setNewTag, removeTag, resetTags } = tagsSlice.actions;

export default tagsSlice.reducer;
