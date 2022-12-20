import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Grow,
  Paper,
  AppBar,
  TextField,
  Button,
} from "@mui/material";
import { MuiChipsInput } from "mui-chips-input";
import Form from "../Form/Form";
import Posts from "../Posts/Posts";
import Modal from "../modal";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { getPosts, getPostsBySearch } from "../../features/posts/postsSlice";
import Page from "../Page/Page";
import { toast } from "react-toastify";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  console.log("useLocation().search", useLocation().search);
  const [currentId, setCurrentId] = useState({ id: null, name: "" });
  const [debouncer, setDebouncer] = useState("");
  const dispatch = useDispatch();
  // const posts = useSelector((store) => store.posts);
  const { isOpen } = useSelector((store) => store.modal);
  const query = useQuery();
  const navigate = useNavigate();
  const page = parseInt(query.get("page") || "1");
  const searchQuery = query.get("searchQuery");
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);

  console.log("page", page);

  console.log("searchQuery", searchQuery);
  const handleAddChip = (chip) => {
    setTags([...tags, chip]);
  };

  const handleDeleteChip = (chiptoDelete) => {
    setTags(tags.filter((tag) => tag !== chiptoDelete));
  };
  // useEffect(() => {
  //   dispatch(getPosts());
  // }, [dispatch, currentId]);

  useEffect(() => {
    let delay = setTimeout(() => {
      setDebouncer(search);
    }, 400);

    return () => clearTimeout(delay);
  }, [search]);

  // function debounce(cb, delay = 1000) {
  //   return (...args) => {
  //     setTimeout(() => {
  //       cb(...args);
  //     }, delay);
  //   };
  // }

  useEffect(() => {
    if (debouncer) {
      console.log("debouncer", debouncer);
      let search = debouncer;
      dispatch(getPostsBySearch({ search }));
    } else {
      dispatch(getPosts());
    }
  }, [debouncer]);

  // useEffect(() => {
  //   if (search) {
  //     console.log("debouncerUseEffect", search);
  //     dispatch(getPostsBySearch({ search }));
  //   } else {
  //     dispatch(getPosts());
  //   }
  // }, [search]);

  const searchPost = () => {
    if (search.trim() || tags.length) {
      console.log("search", search);
      console.log("tags", tags);
      dispatch(getPostsBySearch({ search, tags: tags.join(",") }));
      navigate(
        `/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`
      );
    } else {
      toast.info("Input something to search");
      navigate("/");
    }
  };

  const handleKeyPress = (e) => {
    console.log("e.key", e.key);
    if (e.key === "Enter") {
      searchPost();
    }
  };

  return (
    <div>
      {isOpen && <Modal currentId={currentId} setCurrentId={setCurrentId} />}
      <Grow in>
        <Container maxWidth="xl">
          <Grid
            container
            direction="row"
            justifyContent="space-evenly"
            alignItems="stretch"
            spacing={3}
            wrap="wrap-reverse"
          >
            <Grid item xs={12} sm={6} md={9}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={6} md={3} sx={{ mt: { xs: "80px", sm: 0 } }}>
              <AppBar
                position="static"
                color="inherit"
                sx={{
                  borderRadius: 4,
                  mb: "1rem",
                  display: "flex",
                  padding: "16px",
                }}
              >
                <TextField
                  name="search"
                  variant="outlined"
                  label="seach Memories"
                  fullWidth
                  value={search}
                  onKeyPress={handleKeyPress}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
                <MuiChipsInput
                  style={{ margin: "10px 0" }}
                  value={tags}
                  onAddChip={handleAddChip}
                  onDeleteChip={handleDeleteChip}
                  label="Search Tags"
                  variant="outlined"
                />
                <Button
                  onClick={searchPost}
                  color="primary"
                  variant="contained"
                >
                  Search
                </Button>
              </AppBar>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
              {!searchQuery && !tags.length && (
                <Paper elevation={6} sx={{ borderRadius: "15px" }}>
                  <Page page={page} currentId={currentId} />
                </Paper>
              )}
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </div>
  );
};

export default Home;
