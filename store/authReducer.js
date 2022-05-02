import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isSignIn: "",
    tokenVal: "",
  },
  reducers: {
    setAuth: (state, action) => {
      state.isSignIn = action.payload.isSignIn;
      state.tokenVal = action.payload.tokenVal;
    },
  },
});

export const { setAuth } = authSlice.actions;
export default authSlice.reducer;
export const getAuth = (state) => {
  return { isSignIn: state.auth.isSignIn, tokenVal: state.auth.tokenVal };
};
