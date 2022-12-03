import React, { useState, useRef } from "react";
import { Typography, TextField, Button, Divider } from "@mui/material";
import { useDispatch } from "react-redux";
import "./Styles.css";
import Comments from "./Comments/Comments";

const CommentSection = ({ post }) => {
  const dispatch = useDispatch();
  const commentsRef = useRef(null);
  const [comment, setComment] = useState("");
  const handleComment = async () => {
    alert("dsf");
  };
  console.log("post.comments", post.comments);
  return (
    <div className="commentsOuterContainer">
      <div className="commentsInnerContainer">
        <Typography variant="h5" gutterBottom>
          Comments
        </Typography>
        <Divider style={{ margin: "20px 0" }} />
        {/* {comments.map((comment, index) => (
          <Typography key={index} gutterBottom variant="subtitle1">
            {comment}
          </Typography>
        ))} */}
        <div style={{ width: "100%" }}>
          <Typography gutterBottom variant="h6">
            Write a comment
          </Typography>
          <TextField
            fullWidth
            rows={4}
            variant="outlined"
            label="Comment"
            multiline
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <br />
          <Button
            style={{ marginTop: "10px" }}
            fullWidth
            disabled={!comment.length}
            color="primary"
            variant="contained"
            onClick={handleComment}
          >
            Comment
          </Button>
          <Divider style={{ margin: "20px 0" }} />
        </div>
        {post?.comments.map((comment) => (
          <Comments key={comment._id} {...comment} />
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
