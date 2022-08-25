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
  openedChat: ChatViewDto | null;
  openedChatID: string;
  chats: ChatViewDto[];
  searchingUsersForChat: boolean;
};

const initialState: InboxState = {
  inboxVisibility: false,
  foundForChat: [],
  foundUser: null,
  openedChat: null,
  openedChatID: "",
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
    setOpenedChat: (state, action: { payload: ChatViewDto }) => {
      state.openedChat = action.payload;
    },
    resetOpenedChat: (state) => {
      state.openedChat = null;
    },
    resetOpenedChatID: (state) => {
      state.openedChatID = "";
    },
    setSearchingUsersForChat: (state, action: { payload: boolean }) => {
      state.searchingUsersForChat = action.payload;
    },
    addNewChat: (state, action: { payload: ChatViewDto }) => {
      state.chats.unshift(action.payload);
    },
    setOpenedChatID: (state, action: { payload: string }) => {
      state.openedChatID = action.payload;
    },
    setChats: (state, action) => {
      state.chats = action.payload;
    },
    addMessageToOpenedChat: (state, action: { payload: ChatMessageViewDto }) => {
      state.openedChat?.messages.push(action.payload);
    },
    addMessageToSpecificChat: (
      state,
      action: { payload: { chatID: string; message: ChatMessageViewDto } }
    ) => {
      state.chats.map((c) => {
        if (c.id === action.payload.chatID) {
          c.messages.push(action.payload.message);
        }

        return c;
      });
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
  setOpenedChat,
  resetOpenedChat,
  setSearchingUsersForChat,
  resetOpenedChatID,
  addNewChat,
  setOpenedChatID,
  setChats,
  addMessageToOpenedChat,
  resetFoundUser,
  resetFoundUsers,
  setFoundUsers,
  setFoundUser,
} = inboxSlice.actions;

export default inboxSlice.reducer;
