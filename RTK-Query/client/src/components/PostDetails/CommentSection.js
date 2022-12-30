import React, { useState, useRef, useEffect } from "react";
import { Typography, TextField, Button, Divider, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import "./Styles.css";
import Comments from "./Comments/Comments";
import CircularProgress from "@mui/material/CircularProgress";
import { postComment, updateComment } from "../../features/api";
import { addComment, update } from "../../features/posts/postsSlice";
import { toast } from "react-toastify";

const CommentSection = ({ post, user }) => {
  const { isLoading } = useSelector((store) => store.posts);
  const dispatch = useDispatch();
  const commentsRef = useRef();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(post?.comments);
  const [commentUpdated, setCommentUpdated] = useState({
    appear: false,
    value: null,
  });
  const userId = user?.result?._id;

  useEffect(() => {
    if (commentUpdated?.value) {
      commentsRef.current.focus();
      commentsRef.current.value = commentUpdated?.value?.body;
    }
  }, [commentUpdated?.value]);

  const handleComment = async (e) => {
    e.preventDefault();
    if (commentUpdated.appear) {
      // console.log(commentUpdated);
      const { value: comment } = commentUpdated;
      // await update(post._id, { comments: { $push: [comment] } });
      // setCommentUpdated(false);
      const { CommentPost } = await toast.promise(
        updateComment(
          userId,
          { ...comment, body: commentsRef.current.value },
          post?.id
        ),
        {
          pending: "Updating...",
          success: `Comment Updated Successfully!`,
          error: "Something Went Wrong!",
        }
      );
      if (CommentPost) dispatch(update(CommentPost));
      // alert("update");
      setCommentUpdated({ appear: false, value: null });
      commentsRef.current.value = null;
    } else {
      // console.log("commentsRef.current.value", commentsRef.current.value);
      const comment = commentsRef.current.value;
      const data = await postComment(userId, comment, post?.id);
      // console.log("CCdata", data);
      setComments("");
      setComments(data?.comments);
      dispatch(update(data));
      commentsRef.current.value = null;
    }
  };
  // console.log("post.comments", post.comments);
  const userComments = post?.comments?.filter(
    (comment) => comment?.author?._id === userId
  );
  const otherComments = post?.comments?.filter(
    (comment) => comment?.author?._id !== userId
  );

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
              {commentUpdated.appear ? "Update the Comment" : "Write a comment"}
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
                {commentUpdated.appear ? "Update" : "Comment"}
              </Button>
            </Box>
            <Divider style={{ margin: "20px 0" }} />
            {isLoading && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                <CircularProgress sx={{ mx: "auto" }} />
              </Box>
            )}
          </div>
        )}
        {userComments
          ?.slice(0)
          .reverse()
          .map((comment) => (
            <Comments
              key={comment?._id}
              comment={comment}
              user={user}
              postId={post?.id}
              setCommentUpdated={setCommentUpdated}
            />
          ))}
        {otherComments?.map((comment) => (
          <Comments
            key={comment?._id}
            comment={comment}
            user={user}
            postId={post?.id}
            setCommentUpdated={setCommentUpdated}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
