import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./features/posts/postsSlice";
import modalReducer from "./features/modal/modalSlice";
import authReducer from "./features/auth/authSlice";
export const store = configureStore({
  reducer: {
    posts: postsReducer,
    modal: modalReducer,
    auth: authReducer,
  },
});
