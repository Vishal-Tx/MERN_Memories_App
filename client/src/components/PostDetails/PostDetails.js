import React, { useEffect } from "react";
import {
  Paper,
  CircularProgress,
  Typography,
  Divider,
  Box,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import * as dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useParams, useNavigate } from "react-router-dom";
import { getPost } from "../../features/posts/postsSlice";
import Errorhandler from "../Errorhandler";
dayjs.extend(relativeTime);

const PostDetails = () => {
  const { posts, isLoading, error, post } = useSelector((store) => store.posts);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getPost(id));
  }, [dispatch, id]);

  if (!post) return null;

  return isLoading ? (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <CircularProgress size={70} />
    </div>
  ) : !error ? (
    <div>
      <Typography>post.title</Typography>
    </div>
  ) : (
    <Errorhandler error={error} />
  );
};

export default PostDetails;
