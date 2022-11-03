import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./features/posts/postsSlice";
import modalReducer from "./features/modal/modalSlice";
export const store = configureStore({
  reducer: {
    posts: postsReducer,
    modal: modalReducer,
  },
});
