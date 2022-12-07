import React, { useState, useRef } from "react";
import { Typography, TextField, Button, Divider, Box } from "@mui/material";
import { useDispatch } from "react-redux";
import "./Styles.css";
import Comments from "./Comments/Comments";
import { postComment } from "../../features/api";
import { addComment, update } from "../../features/posts/postsSlice";

const CommentSection = ({ post, user }) => {
  const dispatch = useDispatch();
  const commentsRef = useRef();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(post?.comments);
  const userId = user?.result?._id;

  const handleComment = async () => {
    console.log("commentsRef.current.value", commentsRef.current.value);
    const comment = commentsRef.current.value;
    const data = await postComment(userId, comment, post._id);
    setComments("");
    setComments(data?.comments);

    dispatch(addComment(data));
    dispatch(update(data));
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
        {userId && (
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
              inputRef={commentsRef}
            />
            <br />
            <Box
              style={{
                marginTop: "10px",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button
                style={{
                  marginTop: "10px",
                }}
                color="primary"
                variant="contained"
                onClick={handleComment}
              >
                Comment
              </Button>
            </Box>
            <Divider style={{ margin: "20px 0" }} />
          </div>
        )}
        {comments?.map((comment) => (
          <Comments key={comment._id} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
