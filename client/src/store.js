import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./features/posts/postsSlice";
import modalReducer from "./features/modal/modalSlice";
import authReducer from "./features/auth/authSlice";
import userReducer from "./features/user/userSlice";
import { postApi } from "./features/apiSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
export const store = configureStore({
  reducer: {
    posts: postsReducer,
    modal: modalReducer,
    auth: authReducer,
    user: userReducer,
    [postApi.reducerPath]: postApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postApi.middleware),
});

setupListeners(store.dispatch);
