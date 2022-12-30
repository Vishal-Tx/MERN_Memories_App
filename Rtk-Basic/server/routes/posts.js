import express from "express";
import {
  getPosts,
  getPostsBySearch,
  createPost,
  updatePost,
  deletePost,
  likePost,
  getPost,
  commentPost,
  deleteComment,
  updateComment,
  likeComment,
} from "../controllers/posts.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.route("/").get(getPosts).post(auth, createPost);
router.route("/search").get(getPostsBySearch);

router
  .route("/:id")
  .patch(auth, updatePost)
  .delete(auth, deletePost)
  .get(getPost);

router.patch("/:id/likePost", auth, likePost);

router.patch("/:id/commentPost", auth, commentPost);

router.delete("/:id/deleteComment/:commentId", auth, deleteComment);

router.patch("/:id/updateComment", auth, updateComment);

router.patch("/:id/likeComment/:commentId", auth, likeComment);

export default router;
