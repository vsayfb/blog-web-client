import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    loading: false,
    error: { message: "", createdAt: Date.now() },
  },
  reducers: {
    setLoading: (state) => {
      state.loading = !state.loading;
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

export const { setLoading, setError, resetError } = appSlice.actions;

export default appSlice.reducer;
