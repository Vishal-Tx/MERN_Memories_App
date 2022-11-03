import React, { useState, useEffect } from "react";
import { Typography, Paper, Button, TextField } from "@mui/material";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { postPost, updatePost } from "../../features/api";
import { create, update } from "../../features/posts/postsSlice";
import { toast } from "react-toastify";

function Form({ currentId, setCurrentId }) {
  const dispatch = useDispatch();
  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
    selctedFile: "",
  });
  const post = useSelector((store) => {
    const {
      posts: { posts },
    } = store;
    // console.log("uPost", posts);
    return currentId.id && currentId.name === "update"
      ? posts.find((p) => p._id === currentId.id)
      : null;
  });

  useEffect(() => {
    if (post) {
      setPostData(post);
    }
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentId.id && currentId.name === "update") {
      const data = await updatePost(currentId.id, postData);
      dispatch(update(data));
      if (data) toast.success(`Successfully updated the Memory.`);
    } else {
      const data = await postPost(postData);
      dispatch(create(data));
      if (data) toast.success(`Successfully created the Memory.`);
    }
    clear();
  };
  const handleChange = (e) => {
    const { value, name } = e.target;
    setPostData((data) => {
      return { ...data, [name]: value };
    });
  };
  // console.log(postData);

  const clear = () => {
    setCurrentId({ currentId: null, name: "" });
    setPostData({
      creator: "",
      title: "",
      message: "",
      tags: "",
      selctedFile: "",
    });
  };
  return (
    <Paper sx={{ p: 2, borderRadius: "15px" }}>
      <form
        autoComplete="off"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          padding: "2px",
        }}
        onSubmit={handleSubmit}
      >
        <Typography variant="h5">
          {currentId.id && currentId.name === "update"
            ? "Updating a Memory"
            : "Creating a Memory"}
        </Typography>
        <TextField
          name="creator"
          label="Creator"
          variant="outlined"
          fullWidth
          value={postData.creator}
          onChange={handleChange}
          sx={{ my: 1 }}
          required
        />
        <TextField
          name="title"
          label="Title"
          variant="outlined"
          fullWidth
          value={postData.title}
          onChange={handleChange}
          sx={{ my: 1 }}
        />
        <TextField
          name="message"
          label="Message"
          variant="outlined"
          fullWidth
          value={postData.message}
          onChange={handleChange}
          sx={{ my: 1 }}
        />
        <TextField
          name="tags"
          label="Tags"
          variant="outlined"
          fullWidth
          value={postData.tags}
          onChange={handleChange}
          sx={{ my: 1 }}
        />
        <div style={{ width: "100%", margin: "10px 0", display: "flex" }}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          sx={{ mb: 1 }}
          variant="contained"
          size="large"
          color="primary"
          fullWidth
          type="submit"
        >
          Submit
        </Button>
        <Button
          sx={{ mb: 1 }}
          variant="contained"
          size="small"
          color="error"
          fullWidth
          onClick={clear}
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
}

export default Form;
