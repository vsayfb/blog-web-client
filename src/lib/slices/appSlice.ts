import { createSlice } from "@reduxjs/toolkit";
import { Socket, io } from "socket.io-client";

const initialState: {
  loading: boolean;
  notificationsSocket?: Socket;
  error: { message: string; createdAt: number };
  warn: { message: string; createdAt: number };
  signUpInitStep: boolean;

  fastSignUpVisibility: boolean;
  fastSignInVisibility: boolean;
} = {
  loading: false,
  error: { message: "", createdAt: Date.now() },
  warn: {
    message: "",
    createdAt: Date.now(),
  },
  signUpInitStep: true,
  fastSignUpVisibility: false,
  fastSignInVisibility: false,
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
          `${process.env.REACT_APP_HOST}/notifications`,
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
    showSignUpInitStep: (state) => {
      state.signUpInitStep = true;
    },
    hideSignUpInitStep: (state) => {
      state.signUpInitStep = false;
    },
    showFastSignUp: (state) => {
      state.fastSignUpVisibility = true;
    },
    hideFastSignUp: (state) => {
      state.fastSignUpVisibility = false;
    },
    showFastSignIn: (state) => {
      state.fastSignInVisibility = true;
    },
    hideFastSignIn: (state) => {
      state.fastSignInVisibility = false;
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
  showFastSignIn,
  showFastSignUp,
  hideFastSignIn,
  hideFastSignUp,
  showSignUpInitStep,
  hideSignUpInitStep,
} = appSlice.actions;

export default appSlice.reducer;
