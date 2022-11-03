import axios from "axios";

const url = "http://localhost:3001/posts";

export const postPost = async (post) => {
  try {
    const { data } = await axios.post(url, post);
    // console.log("datainapi", data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = async (id, updatedPost) => {
  try {
    const { data } = await axios.patch(`${url}/${id}`, updatedPost);
    // console.log("datainapi", data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = async (id) => {
  try {
    const { data } = await axios.delete(`${url}/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
