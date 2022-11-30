import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();

    res.status(200).json(postMessages);
    // res.status(404).json({ message: "Something went wrong" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;

  const newPost = new PostMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });
  try {
    await newPost.save();

    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;

  if (!mongoose.isValidObjectId(_id)) {
    return res.status(404).send("No post with that ID");
  }
  const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {
    new: true,
  });
  await updatedPost.save();
  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.isValidObjectId(_id)) {
    return res.status(404).send("No post with that ID");
  }
  await PostMessage.findByIdAndDelete(_id);
  res.json({ message: "post deleted successfully" });
};

export const likePost = async (req, res) => {
  const { id: _id } = req.params;

  if (!req.userId) return res.json({ message: "Unauthenticated" });

  if (!mongoose.isValidObjectId(_id)) {
    return res.status(404).send("No post with that ID");
  }
  const likePost = await PostMessage.findById(_id);
  const index = likePost.likes.findIndex((id) => id === String(req.userId));

  if (index === -1) {
    //like the post
    likePost.likes.push(req.userId);
  } else {
    //dislike the post
    likePost.likes = likePost.likes.filter((id) => id !== String(req.userId));
  }
  await likePost.save();
  res.json(likePost);
};
