import React, { useState, useRef } from "react";
import { Typography, TextField, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import "./Styles.css";

const CommentSection = ({ post }) => {
  const dispatch = useDispatch();
  const [comments, setComments] = useState(post?.comments);
  const commentsRef = useRef(null);
  return (
    <div className="commentsOuterContainer">
      <div className="commentsInnerContainer">
        <Typography variant="h5" gutterBottom>
          Comments
        </Typography>
        {/* {comments.map((comment, index) => (
          <Typography key={index} gutterBottom variant="subtitle1">
            {comment}
          </Typography>
        ))} */}
      </div>
      <div style={{ width: "70%" }}>
        <Typography gutterBottom variant="h6">
          Write a comment
        </Typography>
      </div>
    </div>
  );
};

export default CommentSection;
