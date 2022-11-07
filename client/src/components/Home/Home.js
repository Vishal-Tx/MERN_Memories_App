import React, { useEffect, useState } from "react";
import { Container, Grid, Grow } from "@mui/material";
import Form from "../Form/Form";
import Posts from "../Posts/Posts";
import Modal from "../modal";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../features/posts/postsSlice";

const Home = () => {
  const [currentId, setCurrentId] = useState({ id: null, name: "" });
  const dispatch = useDispatch();
  // const posts = useSelector((store) => store.posts);
  const { isOpen } = useSelector((store) => store.modal);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch, currentId]);

  return (
    <div>
      {isOpen && <Modal currentId={currentId} setCurrentId={setCurrentId} />}
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
    </div>
  );
};

export default Home;
