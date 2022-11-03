import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../features/modal/modalSlice";
import { deletePost } from "../features/api";
import { remove } from "../features/posts/postsSlice";

export default function AlertDialog({ currentId, setCurrentId }) {
  const dispatch = useDispatch();
  const { isOpen } = useSelector((store) => store.modal);
  const post = useSelector((store) => {
    const {
      posts: { posts },
    } = store;
    // console.log("uPost", posts);
    return currentId ? posts.find((p) => p._id === currentId) : null;
  });

  const handleDeleteClick = async (id) => {
    const data = await deletePost(id);
    dispatch(closeModal());
    dispatch(remove(data));
    setCurrentId(null);
  };
  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={() => dispatch(closeModal())}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure that you want to delete "{post.title}". This action is
            irreversible.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => dispatch(closeModal())}>Disagree</Button>
          <Button onClick={() => handleDeleteClick(currentId)} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
