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
import { toast } from "react-toastify";

export default function AlertDialog({ currentId, setCurrentId }) {
  const dispatch = useDispatch();
  const { isOpen } = useSelector((store) => store.modal);
  const post = useSelector((store) => {
    const {
      posts: { posts },
    } = store;
    // console.log("uPost", posts);
    return currentId.id && currentId.name === "delete"
      ? posts.find((p) => p._id === currentId.id)
      : null;
  });

  const handleDeleteClick = async (id) => {
    const data = await deletePost(id);
    console.log("datadelete", data);
    if (data) {
      dispatch(closeModal());
      dispatch(remove(data));
      setCurrentId({ id: null, name: "" });
      toast.success(`Successfully deleted the Memory.`);
    }
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
          <Button onClick={() => handleDeleteClick(currentId.id)} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}