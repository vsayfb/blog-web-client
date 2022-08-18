import { createSlice } from "@reduxjs/toolkit";
import { Socket, io } from "socket.io-client";

const initialState: {
  loading: boolean;
  notificationsSocket?: Socket;
  error: { message: string; createdAt: number };
} = {
  loading: false,
  error: { message: "", createdAt: Date.now() },
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
    resetError: (state) => {
      state.error = { message: "", createdAt: Date.now() };
    },
  },
});

export const { setLoading, setError, resetError, setNotificationSocket } =
  appSlice.actions;

export default appSlice.reducer;
