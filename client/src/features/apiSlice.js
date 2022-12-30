import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react/";

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/" }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: (name) => `/posts?page=${name}`,
    }),
    getPost: builder.query({
      query: (name) => `/posts?page=${name}`,
    }),
  }),
});

export const { useGetPostsQuery } = postApi;
