import React from "react";
import Post from "./Post/Post";
import { useSelector } from "react-redux";
import { Box, CircularProgress, Grid } from "@mui/material";

function Posts({ setCurrentId }) {
  const { posts, isLoading, isError } = useSelector((store) => store.posts);
  console.log("storepost", posts);
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
  ) : !isError ? (
    <Grid container alignItems="stretch" spacing={3}>
      {posts.map((post) => (
        <Grid
          key={post._id}
          item
          xs={12}
          sm={12}
          md={6}
          sx={{ justifyContent: { sm: "flex-start" } }}
        >
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  ) : (
    <Box sx={{ height: "200px", width: "200px" }}>
      Something went wrong. Try Refresh!
    </Box>
  );
}

export default Posts;
