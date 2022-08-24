import { createSlice } from "@reduxjs/toolkit";
import { AccountViewDto } from "../../accounts/types/account-view-dto";
import { ChatMessageViewDto } from "../types/chat-message-view.dto";
import { ChatViewDto } from "../types/chat-view-dto";

export type ChatType = {
  head: { id: string; image: string; title: string };
  messages: ChatMessageViewDto[];
};

export type InboxState = {
  inboxVisibility: boolean;
  foundForChat: AccountViewDto[];
  foundUser: AccountViewDto | null;
  chat: ChatViewDto | null;
  chatID: string;
  chats: ChatViewDto[];
  searchingUsersForChat: boolean;
};

const initialState: InboxState = {
  inboxVisibility: false,
  foundForChat: [],
  foundUser: null,
  chat: null,
  chatID: "",
  chats: [],
  searchingUsersForChat: false,
};

export const inboxSlice = createSlice({
  name: "inbox",
  initialState,
  reducers: {
    toggleInboxVisibility: (state) => {
      state.inboxVisibility = !state.inboxVisibility;
    },
    resetChat: (state) => {
      state.chat = null;
    },
    resetChatID: (state) => {
      state.chatID = "";
    },
    setSearchingUsersForChat: (state, action: { payload: boolean }) => {
      state.searchingUsersForChat = action.payload;
    },
    addNewChat: (state, action: { payload: ChatViewDto }) => {
      state.chats.unshift(action.payload);
    },
    setChat: (state, action: { payload: ChatViewDto }) => {
      state.chat = action.payload;
    },
    setChatID: (state, action: { payload: string }) => {
      state.chatID = action.payload;
    },
    setChats: (state, action) => {
      state.chats = action.payload;
    },
    addMessageToChat: (state, action: { payload: ChatMessageViewDto }) => {
      state.chat?.messages.push(action.payload);
    },
    resetFoundUser: (state) => {
      state.foundUser = null;
    },
    setFoundUsers: (state, action: { payload: AccountViewDto[] }) => {
      state.foundForChat = action.payload;
    },
    resetFoundUsers: (state) => {
      state.foundForChat = [];
    },
    setFoundUser: (state, action: { payload: AccountViewDto }) => {
      state.foundUser = action.payload;
    },
  },
});

export const {
  toggleInboxVisibility,
  setChat,
  resetChat,
  setSearchingUsersForChat,
  resetChatID,
  addNewChat,
  setChatID,
  setChats,
  addMessageToChat,
  resetFoundUser,
  resetFoundUsers,
  setFoundUsers,
  setFoundUser,
} = inboxSlice.actions;

export default inboxSlice.reducer;
