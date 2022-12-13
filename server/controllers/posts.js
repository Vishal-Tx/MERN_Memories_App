import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";
import Comment from "../models/comment.js";

export const getPosts = async (req, res) => {
  // console.log("req.query", req.query);
  const { page } = req.query;
  try {
    const Limit = 8;
    const startIndex = (Number(page) - 1) * Limit;

    const total = await PostMessage.countDocuments({});
    // console.log("totalpost", total);
    const posts = await PostMessage.find()
      .populate({ path: "creator", select: "-password -sub" })
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
        populate: { path: "author", select: "-password -sub" },
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
    })
      .populate("creator")
      .populate({
        path: "comments",
        populate: { path: "author", select: "-password -sub" },
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
  try {
    const newPost = new PostMessage(post);
    newPost.creator = req.userId;
    newPost.createdAt = new Date().toISOString();
    console.log("req.userId", req.userId);
    console.log("newPost", newPost);

    await newPost.save();
    console.log("newPost", newPost);
    res.status(200).json(newPost);
  } catch (error) {
    console.log("error", error);
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
  })
    .populate("creator")
    .populate({
      path: "comments",
      populate: { path: "author", select: "-password -sub" },
    });
  await updatedPost.save();
  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id: _id } = req.params;
  console.log(`deleting post`);
  console.log("req.userId", req.userId);
  try {
    const post = await PostMessage.findById(_id).populate("creator");

    console.log("post.creator._id", post);
    if (post.creator._id.equals(req.userId) || post.creator.sub) {
      console.log("gonna delete");
      if (!mongoose.isValidObjectId(_id)) {
        return res.status(404).send("No post with that ID");
      }

      await PostMessage.findByIdAndDelete(_id);
      res.json({ message: "post deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const likePost = async (req, res) => {
  const { id: _id } = req.params;

  if (!req.userId) return res.json({ message: "Unauthenticated" });

  if (!mongoose.isValidObjectId(_id)) {
    return res.status(404).send("No post with that ID");
  }
  const likePost = await PostMessage.findById(_id)
    .populate("creator")
    .populate({
      path: "comments",
      populate: { path: "author", select: "-password -sub" },
    });
  const index = likePost.likes.findIndex((id) => id === String(req.userId));
  console.log("postIndex", index);

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
  console.log("cBody", req.body);
  const { userId, comment } = req.body;
  console.log("req.params", req.params);
  console.log("req.userId", req.userId);

  if (!req.userId)
    return res.json({ message: "Unauthenticated!, Please Login First." });

  if (req.userId !== userId) return res.json({ message: "UserId Mismatch." });

  if (!mongoose.isValidObjectId(_id)) {
    return res.status(404).send("No post with that ID");
  }

  try {
    const commentPost = await PostMessage.findById(_id)
      .populate("creator")
      .populate({
        path: "comments",
        populate: { path: "author", select: "-password -sub" },
      });

    // const commentBody = await new Comment({
    //   author: userId,
    //   body: comment,
    //   PostMessage: _id,
    // });

    // console.log("commentBody", commentBody);
    // await commentBody.save();
    // Post.comments.push(commentBody);
    // await Post.save();

    // const resultPost = await PostMessage.findById(_id)
    //   .populate("creator")
    //   .populate({
    //     path: "comments",
    //     populate: { path: "author", select: "-password -sub" },
    //   });

    // console.log("resultPost", resultPost);
    // res.status(200).json(resultPost);

    commentPost.comments.push({
      author: userId,
      body: comment,
      PostMessage: _id,
    });

    await commentPost.save();
    const resultPost = await PostMessage.findById(_id)
      .populate("creator")
      .populate({
        path: "comments",
        populate: { path: "author", select: "-password -sub" },
      });
    res.status(200).json(resultPost);
  } catch (error) {
    console.log("error", error);
    res.status(409).json({ message: error.message });
  }
};

export const deleteComment = async (req, res) => {
  const { id: _id, commentId } = req.params;

  try {
    const commentPost = await PostMessage.findByIdAndUpdate(_id, {
      $pull: { comments: { _id: commentId } },
    })
      .populate("creator")
      .populate({
        path: "comments",
        populate: { path: "author", select: "-password -sub" },
      });

    // await Comment.findByIdAndDelete(commentId);

    // const result = commentPost.comments.filter(
    //   (comment) => comment.id !== commentId
    // );

    // commentPost.comments = [...result];

    await commentPost.save();
    const resultPost = await PostMessage.findById(_id)
      .populate("creator")
      .populate({
        path: "comments",
        populate: { path: "author", select: "-password -sub" },
      });
    console.log("resultPost", resultPost);
    res.status(200).json({ resultPost });
  } catch (err) {
    console.log("err", err);
    res.status(500).json({ message: err.message });
  }
};

export const updateComment = async (req, res) => {
  // console.log("updateComment");
  // // console.log("req.userId", req.userId);
  // console.log("req.body", req.body);
  const { id: _id } = req.params;
  const { comment, userId } = req.body;

  try {
    const commentPost = await PostMessage.findById(_id);

    const result = commentPost.comments.filter(
      (Comment) => Comment.id !== comment._id
    );

    commentPost.comments = [...result, comment];
    await commentPost.save();

    const CommentPost = await PostMessage.findById(_id)
      .populate("creator")
      .populate({
        path: "comments",
        populate: { path: "author", select: "-password -sub" },
      });

    console.log("CommentPost", CommentPost);
    res.json({ CommentPost });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const likeComment = async (req, res) => {
  const { id: _id, commentId } = req.params;
  console.log("req.params", req.params);

  if (!req.userId) return res.json({ message: "Unauthenticated" });

  if (!mongoose.isValidObjectId(_id)) {
    return res.status(404).send("No post with that ID");
  }

  try {
    const likeCommentPost = await PostMessage.findById(_id)
      .populate("creator")
      .populate({
        path: "comments",
        populate: { path: "author", select: "-password -sub" },
      });

    // console.log("likeCommentPost", likeCommentPost);
    const result = likeCommentPost?.comments?.find(
      (Comment) => Comment._id.toString() === commentId
    );

    const restComments = likeCommentPost?.comments?.filter(
      (Comment) => Comment._id.toString() !== commentId
    );

    // console.log("resultjhcgh", result.likes);

    const index = result?.likes?.findIndex((id) => id === String(req.userId));
    console.log("index", index);

    if (index === -1) {
      //like the post
      result.likes.push(req.userId);
    } else {
      //dislike the post
      result.likes = result?.likes?.filter((id) => id !== String(req.userId));
    }
    likeCommentPost.comments = [...restComments, result];
    await likeCommentPost.save();
    console.log("likeCommentPost.comments", likeCommentPost);

    res.json(likeCommentPost);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
