import React from "react";
import { likePost } from "../../../features/api";
import { update } from "../../../features/posts/postsSlice";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import { useDispatch } from "react-redux";

const Likes = ({ likes, userId }) => {
  //   const dispatch = useDispatch();
  //   const handleLike = async () => {
  //     const data = await likePost(post._id);
  //     dispatch(update(data));
  //   };

  if (likes?.length > 0) {
    return likes.find((like) => like === userId) ? (
      <>
        <ThumbUpIcon fontSize="small" sx={{ mr: "4px" }} />
        &nbsp;
        {likes.length > 2
          ? `You and ${likes.length - 1} others`
          : `${likes.length} like${likes.length > 1 ? "s" : ""}`}
      </>
    ) : (
      <>
        <ThumbUpOffAltIcon fontSize="small" />
        &nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}
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
