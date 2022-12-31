import React from "react";
import Post from "./Post/Post";
import { useSelector } from "react-redux";
import { Grid, Skeleton } from "@mui/material";
import Errorhandler from "../Errorhandler";
import { useGetPostsQuery } from "../../features/apiSlice";
import { selectAll, selectPostIds } from "../../features/posts/postsSlice";

function Posts({ setCurrentId, page }) {
  const { isLoading, error } = useSelector((store) => store.posts);
  // console.log("error", error);
  // const { data, error, isLoading, isFetching } = queryRes;
  // console.log("data", data);
  // console.log("error", error);
  // console.log("isLoading", isLoading);
  // const posts = data?.data;
  const postIds = useSelector((store) => selectPostIds(store));
  return isLoading ? (
    <Grid container alignItems="stretch" spacing={3}>
      {[...Array(8)].map((item, index) => (
        <Grid
          key={index}
          item
          xs={12}
          sm={12}
          md={6}
          lg={3}
          sx={{ justifyContent: { sm: "flex-start" } }}
        >
          <Skeleton
            variant="rounded"
            sx={{ borderRadius: "15px", display: "flex" }}
            width={229.5}
            height={352.275}
            animation="wave"
          />
        </Grid>
      ))}
    </Grid>
  ) : !error ? (
    <Grid container alignItems="stretch" spacing={3}>
      {postIds?.map((postId) => (
        <Grid
          key={postId}
          item
          xs={12}
          sm={12}
          md={6}
          lg={3}
          sx={{ justifyContent: { sm: "flex-start" } }}
        >
          <Post postId={postId} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  ) : (
    <Errorhandler error={error} />
  );
}

export default Posts;
