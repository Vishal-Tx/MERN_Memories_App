import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
  if (!!localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile"))?.token
    }`;
  }

  return req;
});

export const postPost = async (post) => {
  try {
    const { data } = await API.post("/posts", post);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchPosts = async (page) => {
  const { data } = await API.get(`/posts?page=${page}`);
  // console.log("totalPosts", data);
  return data;
};

export const fetchPost = async (id) => {
  const { data } = await API.get(`/posts/${id}`);
  // console.log("individualpostfromBack", data);
  return data;
};

export const fetchPostsBySearch = async (searchQuery) => {
  // console.log("searchQueryapi", searchQuery);
  const { data } = await API.get(
    `/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${
      searchQuery.tags
    }`
  );
  // console.log("searchAPIData", data);
  return data;
};

export const updatePost = async (id, updatedPost) => {
  try {
    const { data } = await API.patch(`/posts/${id}`, updatedPost);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = async (id) => {
  try {
    const { data } = await API.delete(`/posts/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const likePost = async (id) => {
  try {
    const { data } = await API.patch(`/posts/${id}/likePost`);
    // console.log("APiLike", data);

    return data;
  } catch (error) {
    console.log("errer", error);
  }
};

export const postComment = async (userId, comment, id) => {
  const { data } = await API.patch(`/posts/${id}/commentPost`, {
    userId,
    comment,
  });
  // console.log("CommentAPIDAta", data);
  return data;
};

export const deleteComment = async (commentId, id) => {
  const { data } = await API.delete(`/posts/${id}/deleteComment/${commentId}`);
  // console.log("DeleteCommentAPIDAta", data);
  return data;
};

export const updateComment = async (userId, comment, id) => {
  const { data } = await API.patch(`/posts/${id}/updateComment`, {
    userId,
    comment,
  });
  // console.log("UpdateCommentAPIDAta", data);
  return data;
};

export const likeComment = async (commentId, id) => {
  const { data } = await API.patch(`/posts/${id}/likeComment/${commentId}`);
  // console.log("APiCommentLike", data);

  return data;
};

export const signin = async (formData) => {
  const { data } = await API.post("/user/signin", formData);
  // console.log("SignInData", data);
  return data;
};

export const signup = async (formData) => {
  const { data } = await API.post("/user/signup", formData);
  // console.log("SignupData", data);
  return data;
};

export const signinGoogle = async (gData) => {
  // console.log("signinGoogle", gData);
  const { data } = await API.post("/user/signinGoogle", { data: gData });
  // console.log("googleSignin", data);
  return data;
};

export const fetchUser = async (id) => {
  const { data } = await API.get(`/user/${id}`);
  // console.log("user", data);
  return data;
};
