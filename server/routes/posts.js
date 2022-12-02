import express from "express";
import {
  getPosts,
  getPostsBySearch,
  createPost,
  updatePost,
  deletePost,
  likePost,
  getPost,
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

export default router;
