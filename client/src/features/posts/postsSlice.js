import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchPosts, fetchPostsBySearch } from "../api";

const url = "http://localhost:3001/posts";

const initialState = {
  posts: [],
  isLoading: true,
  error: null,
  currentPage: 1,
  numberOfPages: 1,
};
console.log("initialState.posts", initialState.posts);

export const getPosts = createAsyncThunk(
  "posts/getPosts",
  async (page, thunkAPI) => {
    try {
      const res = await fetchPosts(page);
      console.log("allres", res);
      return res;
    } catch (error) {
      const {
        response: { data, status },
      } = error;
      console.log("fetcherror", error);
      return thunkAPI.rejectWithValue({ data, status });
    }
  }
);

export const getPostsBySearch = createAsyncThunk(
  "posts/getPostsBySearch",
  async (name, thunkAPI) => {
    try {
      console.log("searched", name);
      const { posts } = await fetchPostsBySearch(name);
      console.log("sData", posts);
      return posts;
    } catch (error) {
      const {
        response: { data, status },
      } = error;
      console.log("fetcherror", error);
      return thunkAPI.rejectWithValue({ data, status });
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
    like: (state, action) => {
      state.posts = state.posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    },
  },
  extraReducers: {
    [getPosts.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getPosts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.posts = action.payload.data;
      state.currentPage = action.payload.currentPage;
      state.numberOfPages = action.payload.numberOfPages;
      console.log("allposts", action.payload);
      console.log("state.posts", state.posts);
      state.error = null;
    },
    [getPosts.rejected]: (state, action) => {
      console.log("Raction", action);
      state.isLoading = false;
      state.error = action.payload;
      console.log("rejected");
    },

    [getPostsBySearch.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getPostsBySearch.fulfilled]: (state, action) => {
      state.isLoading = false;
      console.log("actionS", action.payload);
      state.posts = action.payload;
      state.error = null;
    },
    [getPostsBySearch.rejected]: (state, action) => {
      console.log("Raction", action);
      state.isLoading = false;
      state.error = action.payload;
      console.log("rejected");
    },
  },
});

export const { fetchAll, create, update, remove, like } = postsSlice.actions;

export default postsSlice.reducer;
