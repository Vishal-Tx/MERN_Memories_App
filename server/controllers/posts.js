import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
  // console.log("req.query", req.query);
  const { page } = req.query;
  try {
    const Limit = 8;
    const startIndex = (Number(page) - 1) * Limit;

    const total = await PostMessage.countDocuments({});
    // console.log("totalpost", total);
    const posts = await PostMessage.find()
      .populate({ path: "creator", select: "-password" })
      .populate({
        path: "comments",
        populate: { path: "author", select: "-password" },
      })
      .sort({ _id: -1 })
      .limit(Limit)
      .skip(startIndex);

    res.status(200).json({
      data: posts,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / Limit),
    });
    // res.status(404).json({ message: "Something went wrong" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await PostMessage.findOne({ _id: id })
      .populate("creator")
      .populate({
        path: "comments",
        populate: { path: "author", select: "-password" },
      });

    res.status(200).json({ post });
    // res.status(404).json({ message: "Something went wrong" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPostsBySearch = async (req, res) => {
  // console.log("hit");
  const { searchQuery, tags } = req.query;

  // console.log("req.querySSSSSSSS", req.query);
  // const { page } = req.query;
  // console.log("searchQuery", searchQuery.length);
  // console.log("tags", tags.length);
  try {
    const title = new RegExp(searchQuery, "i");

    // if (searchQuery.length > 0 && tags.length > 0) {
    //   const posts = await PostMessage.find({
    //     $and: [{ title }, { tags: { $in: tags.split(",") } }],
    //   });
    //   res.status(200).json({ posts });
    // } else {

    const posts = await PostMessage.find({
      $or: [{ title }, { tags: { $in: tags.split(",") } }],
    });

    if (!posts.length) {
      res.status(404).json({ message: "No posts found" });
    } else {
      res.status(200).json({
        posts,
      });
    }
    // }
  } catch (error) {
    res.status(404).json({ message: error.message });
    console.log(error);
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
  const likePost = await PostMessage.findById(_id).populate("creator");
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

export const commentPost = async (req, res) => {
  const { id: _id } = req.params;
  const comment = req.body;

  if (!req.userId)
    return res.json({ message: "Unauthenticated!, Please Login First." });

  if (!mongoose.isValidObjectId(_id)) {
    return res.status(404).send("No post with that ID");
  }

  try {
    const commentPost = await PostMessage.findById(_id).populate("creator");
    commentPost.comment.push(comment);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
