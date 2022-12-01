import React from "react";
import Post from "./Post/Post";
import { useSelector } from "react-redux";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";

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
    <Box
      sx={{
        height: "100vh",
      }}
    >
      <Typography sx={{ color: "#1565c0", fontSize: "100px" }} align="center">
        {error.status}
      </Typography>
      <Typography sx={{ color: "#1565c0", fontSize: "80px" }} align="center">
        {error?.data?.message ? error?.data?.message : "Try Refresh"}
      </Typography>
    </Box>
  );
}

export default Posts;
