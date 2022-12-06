import React from "react";
import { likePost } from "../../../features/api";
import { update } from "../../../features/posts/postsSlice";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import { useDispatch } from "react-redux";

const Likes = ({ post, userId }) => {
  //   const dispatch = useDispatch();
  //   const handleLike = async () => {
  //     const data = await likePost(post._id);
  //     dispatch(update(data));
  //   };

  if (post.likes.length > 0) {
    return post.likes.find((like) => like === userId) ? (
      <>
        <ThumbUpIcon fontSize="small" sx={{ mr: "4px" }} />
        &nbsp;
        {post.likes.length > 2
          ? `You and ${post.likes.length - 1} others`
          : `${post.likes.length} like${post.likes.length > 1 ? "s" : ""}`}
      </>
    ) : (
      <>
        <ThumbUpOffAltIcon fontSize="small" />
        &nbsp;{post.likes.length} {post.likes.length === 1 ? "Like" : "Likes"}
      </>
    );
  }
  return (
    <>
      <ThumbUpOffAltIcon fontSize="small" />
      &nbsp;Like
    </>
  );
};

export default Likes;
