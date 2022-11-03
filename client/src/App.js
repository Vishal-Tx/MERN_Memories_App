import React, { useEffect, useState } from "react";
import { Container, AppBar, Typography, Grow, Grid } from "@mui/material";
import memories from "./images/memories.png";
import { Form, Modal, Posts } from "./components";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "./features/posts/postsSlice";

const App = () => {
  const [currentId, setCurrentId] = useState({ id: null, name: "" });
  const dispatch = useDispatch();
  // const posts = useSelector((store) => store.posts);
  const { isOpen } = useSelector((store) => store.modal);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch, currentId]);

  return (
    <>
      {isOpen && <Modal currentId={currentId} setCurrentId={setCurrentId} />}
      <Container maxWidth="lg">
        <AppBar
          sx={{
            borderRadius: 15,
            margin: "30px 0",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
          }}
          position="static"
          color="inherit"
        >
          <Typography
            sx={{ color: "rgba(0,183,255, 1)" }}
            variant="h2"
            align="center"
          >
            Memories
          </Typography>
          <img
            src={memories}
            alt="memories"
            height="60"
            style={{ marginLeft: "15px" }}
          />
        </AppBar>
        <Grow in>
          <Container>
            <Grid
              container
              direction="row"
              justifyContent="space-evenly"
              alignItems="stretch"
              spacing={3}
              wrap="wrap-reverse"
            >
              <Grid item xs={12} sm={7}>
                <Posts setCurrentId={setCurrentId} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Form currentId={currentId} setCurrentId={setCurrentId} />
              </Grid>
            </Grid>
          </Container>
        </Grow>
      </Container>
    </>
  );
};

export default App;
