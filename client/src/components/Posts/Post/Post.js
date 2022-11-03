import React from "react";
import {
  Card,
  CardActions,
  CardMedia,
  CardContent,
  Button,
  Typography,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import * as dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { openModal } from "../../../features/modal/modalSlice";
dayjs.extend(relativeTime);

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: "15px",
        height: "100%",
        position: "relative",
        // border: "0.5px solid rgba(0,0,0,0.45)",
        // boxShadow: "10px 10px 5px 2px rgba(0,0,0,0.45)",
      }}
    >
      <CardMedia
        sx={{
          height: 0,
          paddingTop: "56.25%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          backgroundBlendMode: "darken",
        }}
        image={post.selectedFile}
        title={post.title}
      />
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          color: "white",
        }}
      >
        <Typography variant="h6">{post.creator}</Typography>
        <Typography variant="body2">
          {dayjs(post.createdAt).fromNow()}
        </Typography>
      </div>
      <div
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          color: "white",
        }}
      >
        <Button
          style={{ color: "white" }}
          size="small"
          onClick={() => {
            setCurrentId(post._id);
          }}
        >
          <MoreHorizIcon fontSize="medium" />
        </Button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "20px",
        }}
      >
        <Typography variant="body2" color="textSecondary">
          {post.tags.map((tag) => `${tag}`)}
        </Typography>
      </div>
      <Typography sx={{ padding: "0 16px" }} variant="h5" gutterBottom>
        {post.title}
      </Typography>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {post.message}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          padding: "0 16px 8px 16px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button size="small" color="primary" onClick={() => {}}>
          <ThumbUpIcon fontSize="small" sx={{ mr: "4px" }} />
          {post.likeCount}
        </Button>
        <Button
          size="small"
          color="error"
          onClick={() => {
            setCurrentId(post._id);
            dispatch(openModal());
          }}
        >
          <DeleteIcon fontSize="small" sx={{ mr: "2px" }} />
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default Post;
