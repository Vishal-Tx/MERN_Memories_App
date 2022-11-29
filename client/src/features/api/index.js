import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:3001" });

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
    return data;
  } catch (error) {
    console.log("errer", error);
  }
};

export const signin = async (formData) => {
  const { data } = await API.post("/user/signin", formData);
  console.log("SignInData", data);
  return data;
};

export const signup = async (formData) => {
  const { data } = await API.post("/user/signup", formData);
  console.log("SignupData", data);
  return data;
};
