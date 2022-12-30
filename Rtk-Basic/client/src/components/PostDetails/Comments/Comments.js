import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Grid,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteComment, likeComment } from "../../../features/api";
import { toast } from "react-toastify";
import { update } from "../../../features/posts/postsSlice";
import "./Comments.css";
import Likes from "../../Posts/Post/Likes";
dayjs.extend(relativeTime);

const Comments = ({ comment, user, postId, setCommentUpdated }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userId = user?.result?._id;
  const [likes, setLikes] = useState(comment?.likes);

  // useEffect(() => {
  //   dispatch(getUser(commentCreator));
  // }, [location]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCommentUpdate = () => {
    setCommentUpdated({ appear: true, value: comment });
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCommentDelete = async () => {
    const { resultPost } = await toast.promise(
      deleteComment(comment?._id, postId),
      {
        pending: "Deleting...",
        success: `Comment deleted Successfully!`,
        error: "Something Went Wrong!",
      }
    );
    dispatch(update(resultPost));
  };

  const hasLikedPost = comment?.likes?.find((like) => like === userId);

  const handleLike = async () => {
    const data = await likeComment(comment?._id, postId);
    console.log("Likedata", data);
    dispatch(update(data));

    if (hasLikedPost) {
      setLikes(comment.likes.filter((id) => id !== userId));
    } else {
      setLikes([...comment.likes, userId]);
    }
  };

  function randomColor() {
    let hex = Math.floor(Math.random() * 0xffffff);
    let color = "#" + hex.toString(16);

    return color;
  }
  return (
    <div>
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="center"
        sx={{ my: "15px" }}
      >
        <Grid
          item
          xs={2.5}
          sm={1}
          md={0.8}
          lg={0.6}
          sx={{
            display: "flex",
            justifyContent: {
              xs: "flex-start",
              sm: "flex-start",
            },
          }}
        >
          <Link
            className="commentUserAvatar"
            to={`/user/${comment?.author?._id}`}
          >
            <Avatar
              alt={comment?.author?.name}
              src={comment?.author?.picture}
              sx={{ bgcolor: randomColor() }}
            >
              {comment?.author?.name?.charAt(0)}
            </Avatar>
          </Link>
        </Grid>
        <Grid item xs={8.5} sm={10} md={10.2} lg={10.4}>
          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            <Link
              to={`/user/${comment?.author?._id}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <Typography sx={{ mr: { xs: "6px", sm: 0 } }}>
                {comment?.author?.name}
              </Typography>
            </Link>
            <Typography
              variant="subtitle2"
              color="textSecondary"
              sx={{ ml: { xs: 0, sm: "8px" }, mt: "2px" }}
            >
              {dayjs(comment?.commentDate).fromNow()}
            </Typography>
          </Box>
          <Typography sx={{ fontWeight: 500, fontSize: "1.1rem" }}>
            {comment.body}
          </Typography>
        </Grid>
        {userId === comment?.author?._id ? (
          <Grid
            item
            xs={1}
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-start",
              mt: "-40px",
            }}
          >
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <MoreVertIcon />
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleCommentUpdate}>
                <EditIcon sx={{ ml: "-8px", mr: "20px" }} />
                Edit
              </MenuItem>
              <MenuItem onClick={handleCommentDelete}>
                <DeleteIcon sx={{ ml: "-8px", mr: "20px" }} />
                Delete
              </MenuItem>
            </Menu>
          </Grid>
        ) : (
          <Grid
            item
            xs={1}
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-start",
              mt: "-40px",
            }}
          ></Grid>
        )}
        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            position: "relative",

            ml: { xs: "60px", sm: "52px" },
          }}
        >
          <Button
            size="small"
            color="primary"
            disabled={!user?.result}
            onClick={handleLike}
          >
            <Likes likes={comment?.likes} userId={userId} />
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Comments;
