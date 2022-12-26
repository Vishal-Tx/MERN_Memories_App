import React from "react";
import Post from "./Post/Post";
import { useSelector } from "react-redux";
import { Grid, Skeleton } from "@mui/material";
import Errorhandler from "../Errorhandler";

function Posts({ setCurrentId }) {
  const { posts, isLoading, error } = useSelector((store) => store.posts);
  // console.log("error", error);
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
      {posts?.map((post) => (
        <Grid
          key={post._id}
          item
          xs={12}
          sm={12}
          md={6}
          lg={3}
          sx={{ justifyContent: { sm: "flex-start" } }}
        >
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  ) : (
    <Errorhandler error={error} />
  );
}

export default Posts;
