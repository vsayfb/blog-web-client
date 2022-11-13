import { createSlice } from "@reduxjs/toolkit";
import { ProfileViewDto } from "../types/profile-view.dto";

const initialState: { profile: ProfileViewDto["data"] | null } = {
  profile: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action: { payload: ProfileViewDto["data"] }) => {
      state.profile = action.payload;
    },
    resetProfile: (state) => {
      state.profile = null;
    },
    increaseFollowers: (state) => {
      if (state.profile) {
        state.profile.followers_count += 1;
        state.profile.following_by = true;
      }
    },
    decreaseFollowers: (state) => {
      if (state.profile) {
        state.profile.followers_count -= 1;
        state.profile.following_by = false;
      }
    },
  },
});

export default profileSlice.reducer;

export const {
  setProfile,
  resetProfile,
  increaseFollowers,
  decreaseFollowers,
} = profileSlice.actions;
