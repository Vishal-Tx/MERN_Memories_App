import React from "react";
import Post from "./Post/Post";
import { useSelector } from "react-redux";
import { CircularProgress, Grid } from "@mui/material";
import Errorhandler from "../Errorhandler";

function Posts({ setCurrentId }) {
  const { posts, isLoading, error } = useSelector((store) => store.posts);
  console.log("error", error);
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
