import express from "express";
import {
  getPosts,
  getPostsBySearch,
  createPost,
  updatePost,
  deletePost,
  likePost,
} from "../controllers/posts.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.route("/").get(getPosts).post(auth, createPost);
router.route("/search").get(getPostsBySearch);

router.route("/:id").patch(auth, updatePost).delete(auth, deletePost);

router.patch("/:id/likePost", auth, likePost);

export default router;
