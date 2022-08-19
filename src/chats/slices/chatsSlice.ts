import { createSlice } from "@reduxjs/toolkit";

const initialState: { inboxVisibility: boolean } = {
  inboxVisibility: false,
};

export const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    toggleInboxVisibility: (state) => {
      state.inboxVisibility = !state.inboxVisibility;
    },
  },
});

export const { toggleInboxVisibility } = chatsSlice.actions;

export default chatsSlice.reducer;
