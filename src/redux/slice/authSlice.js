import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSignedIn: false,
  userInfo: {},
  accessToken: "",
  type: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userInfo = action.payload.userInfo;
      state.type = action.payload.type;
      state.accessToken = action.payload.accessToken;
      state.isSignedIn = action.payload.isSignedIn;
    },
    signOut: (state) => {
      state.userInfo = initialState.userInfo;
      state.type = initialState.type;
      state.accessToken = initialState.accessToken;
      state.isSignedIn = initialState.isSignedIn;
    },
    updateToken: (state, action) => {
      console.log("Update");
      state.accessToken = action.payload.accessToken;
    },
  },
});

export const { setUser, signOut, updateToken } = authSlice.actions;
export default authSlice.reducer;
