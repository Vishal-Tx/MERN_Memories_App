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
import { remove, selectPostById } from "../features/posts/postsSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function AlertDialog({ currentId, setCurrentId, detailsPage }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isOpen } = useSelector((store) => store.modal);
  const post = useSelector((store) => selectPostById(store, currentId.id));
  // console.log("currentId", currentId);

  // const post = useSelector((store) => {
  //   const {
  //     posts: { posts },
  //   } = store;
  //   // console.log("uPost", posts);
  //   return currentId.id && currentId.name === "delete"
  //     ? posts.find((p) => p._id === currentId.id)
  //     : null;
  // });

  // const posts = useSelector((store) => selectById(store));

  const handleDeleteClick = async (id) => {
    // const data = await deletePost(id);
    // console.log("datadelete", data);
    const data = await toast.promise(deletePost(id), {
      pending: "Deleting!",
      success: `File Deleted Successfully!`,
      error: "Something Went Wrong!",
    });
    if (data) {
      dispatch(closeModal());
      dispatch(remove(data));
      setCurrentId({ id: null, name: "" });
      if (detailsPage) navigate("/");
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
