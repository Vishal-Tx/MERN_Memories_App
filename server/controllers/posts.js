import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();

    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;

  const newPost = new PostMessage(post);
  try {
    await newPost.save();

    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  console.log("id", _id);
  const post = req.body;

  if (!mongoose.isValidObjectId(_id)) {
    return res.status(404).send("No post with that ID");
  }
  const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {
    new: true,
  });
  await updatedPost.save();
  res.json(updatePost);
};

export const deletePost = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.isValidObjectId(_id)) {
    return res.status(404).send("No post with that ID");
  }
  const post = await PostMessage.findByIdAndDelete(_id);
  res.json(post);
};
