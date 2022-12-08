import React from "react";
import { useSelector, useDispatch } from "react-redux";
import * as dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useLocation, useNavigate } from "react-router-dom";
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
import { deleteComment } from "../../../features/api";
import { toast } from "react-toastify";
import { update } from "../../../features/posts/postsSlice";
dayjs.extend(relativeTime);

function randomColor() {
  let hex = Math.floor(Math.random() * 0xffffff);
  let color = "#" + hex.toString(16);

  return color;
}

const Comments = ({ comment, user, postId, setCommentUpdated }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userId = user?.result?._id;

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
    const { commentPost } = await toast.promise(
      deleteComment(comment?._id, postId),
      {
        pending: "Deleting...",
        success: `Comment deleted Successfully!`,
        error: "Something Went Wrong!",
      }
    );
    dispatch(update(commentPost));
  };

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
          xs={3}
          sm={1}
          md={0.6}
          sx={{
            display: "flex",
            justifyContent: {
              xs: "flex-start",
              sm: "flex-start",
            },
          }}
        >
          <Avatar
            alt={comment?.author?.name}
            src={comment?.author?.picture}
            sx={{ bgcolor: randomColor() }}
          >
            {comment?.author?.name?.charAt(0)}
          </Avatar>
        </Grid>
        <Grid item xs={8} sm={10} md={10.4}>
          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            <Typography align="flex-start" sx={{ mr: { xs: "6px", sm: 0 } }}>
              {comment?.author?.name}
            </Typography>
            <Typography
              align="flex-start"
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
            sm={1}
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
            sm={1}
            md={1}
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-start",
              mt: "-40px",
            }}
          ></Grid>
        )}
      </Grid>
    </div>
  );
};

export default Comments;
