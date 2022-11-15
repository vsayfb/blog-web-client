import { createSlice } from "@reduxjs/toolkit";
import { Socket, io } from "socket.io-client";

export type AppColors = {
  zinc900: string;
  zinc50: string;
  orange200: string;
  blue400: string;
};

const initialState: {
  loading: boolean;
  theme: "dark" | "light";
  colors: AppColors;
  notificationsSocket?: Socket;
  error: { message: string; createdAt: number };
  warn: { message: string; createdAt: number };
} = {
  loading: false,
  theme: "light",
  colors: {
    zinc900: "zinc-900",
    zinc50: "zinc-50",
    orange200: "orange-200",
    blue400: "zinc-900",
  },

  error: { message: "", createdAt: Date.now() },
  warn: {
    message: "",
    createdAt: Date.now(),
  },
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = !state.loading;
    },
    setNotificationSocket: (state) => {
      const token = localStorage.getItem("token");

      if (token) {
        state.notificationsSocket = io(
          `${process.env.REACT_APP_BASE_URL}/notifications`,
          {
            auth: { token: localStorage.getItem("token") },
          }
        ) as any;
      }
    },
    setError: (state, action: { payload: string }) => {
      state.error = {
        message: action.payload,
        createdAt: Date.now(),
      };
    },
    setWarn: (state, action: { payload: string }) => {
      state.warn = {
        message: action.payload,
        createdAt: Date.now(),
      };
    },
    resetError: (state) => {
      state.error = { message: "", createdAt: Date.now() };
    },
    resetWarn: (state) => {
      state.warn = { message: "", createdAt: Date.now() };
    },
  },
});

export const {
  setLoading,
  setError,
  resetError,
  setWarn,
  resetWarn,
  setNotificationSocket,
} = appSlice.actions;

export default appSlice.reducer;
