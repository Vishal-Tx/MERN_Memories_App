import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUser } from "../api";

const initialState = {
  user: null,
  isLoading: true,
  error: null,
};
// console.log("initialState.posts", initialState.posts);

export const getUser = createAsyncThunk(
  "post/getUser",
  async (id, thunkAPI) => {
    try {
      const data = await fetchUser(id);
      // console.log("userCData", data);
      return data;
    } catch (error) {
      const {
        response: { data, status },
      } = error;
      // console.log("fetcherror", error);
      return thunkAPI.rejectWithValue({ data, status });
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // clearAll: (state, action) => {
    //   state.posts = [];
    // },
    // create: (state, action) => {
    //   console.log("action", action.payload);
    //   state.posts = [...state.posts, action.payload];
    // },
    // update: (state, action) => {
    //   state.posts = state.posts.map((post) =>
    //     post._id === action.payload._id ? action.payload : post
    //   );
    // },
    // remove: (state, action) => {
    //   state.posts = state.posts.filter(
    //     (post) => post._id !== action.payload._id
    //   );
    // },
    // like: (state, action) => {
    //   state.posts = state.posts.map((post) =>
    //     post._id === action.payload._id ? action.payload : post
    //   );
    // },
  },
  extraReducers: {
    [getUser.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.user = action.payload.data;
      // console.log("action.payload.user", action.payload.data);
      // console.log("state.user", state.user);
      state.error = null;
    },
    [getUser.rejected]: (state, action) => {
      // console.log("Raction", action);
      state.isLoading = false;
      state.error = action.payload;
      // console.log("rejected");
    },
  },
});

// export const { fetchAll, create, update, remove, like } = userSlice.actions;

export default userSlice.reducer;
