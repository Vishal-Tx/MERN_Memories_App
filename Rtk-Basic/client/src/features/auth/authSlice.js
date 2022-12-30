import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    LogIn: (state, action) => {
      console.log("AuthActionLogin", action.payload);
      localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
      return { ...state, authData: action?.payload };
    },
    LogOut: (state, action) => {
      console.log("Logout", action);
      localStorage.clear();
      return { ...state, authData: null };
    },
  },
});
export const { LogIn, LogOut } = authSlice.actions;
export default authSlice.reducer;
