import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "http://localhost:3001/posts";

const initialState = {
  posts: [],
  isLoading: true,
};
console.log("initialState.posts", initialState.posts);

export const getPosts = createAsyncThunk(
  "posts/getPosts",
  async (name, thunkAPI) => {
    try {
      const res = await axios(url);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    clearAll: (state, action) => {
      state.posts = [];
    },
    create: (state, action) => {
      console.log("action", action.payload);
      state.posts = [...state.posts, action.payload];
    },
    update: (state, action) => {
      state.posts = state.posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    },
    remove: (state, action) => {
      state.posts = state.posts.filter(
        (post) => post._id !== action.payload._id
      );
    },
  },
  extraReducers: {
    [getPosts.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getPosts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.posts = action.payload;
      console.log(state.posts);
    },
    [getPosts.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const { fetchAll, create, update, remove } = postsSlice.actions;

export default postsSlice.reducer;
