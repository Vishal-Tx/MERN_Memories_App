import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "http://localhost:3001/posts";

const initialState = {
  posts: [],
  isLoading: true,
  error: null,
};
console.log("initialState.posts", initialState.posts);

export const getPosts = createAsyncThunk(
  "posts/getPosts",
  async (name, thunkAPI) => {
    try {
      const res = await axios(url);
      return res.data;
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
      state.posts = action.payload;
      console.log("state.posts", state.posts);
    },
    [getPosts.rejected]: (state, action) => {
      console.log("Raction", action);
      state.isLoading = false;
      state.error = action.payload;
      console.log("rejected");
    },
  },
});

export const { fetchAll, create, update, remove, like } = postsSlice.actions;

export default postsSlice.reducer;
