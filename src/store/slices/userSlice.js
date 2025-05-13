import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  userInfo: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.isAuthenticated = true;
      state.userInfo = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userInfo = null;
    },
    verifyKYC: (state) => {
      if (state.userInfo) {
        state.userInfo.verifyAccount = true;
      }
    },
  },
});

export const { setUser, logout, verifyKYC } = userSlice.actions;
export default userSlice.reducer;
