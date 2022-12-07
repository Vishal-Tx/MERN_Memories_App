import React from "react";
import { useSelector, useDispatch } from "react-redux";
import * as dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useLocation, useNavigate } from "react-router-dom";
import { Avatar, Button, Grid, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteComment } from "../../../features/api";
dayjs.extend(relativeTime);

function randomColor() {
  let hex = Math.floor(Math.random() * 0xffffff);
  let color = "#" + hex.toString(16);

  return color;
}

const Comments = ({ comment, user, postId }) => {
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
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCommentDelete = async () => {
    console.log("comment", comment);
    const data = await deleteComment(userId, comment, postId);
  };

  return (
    <div>
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        <Grid
          item
          xs={3}
          sm={1}
          sx={{ display: "flex", justifyContent: "flex-start" }}
        >
          <Avatar
            alt={comment?.author?.name}
            src={comment?.author?.picture}
            sx={{ bgcolor: randomColor() }}
          >
            {comment?.author?.name?.charAt(0)}
          </Avatar>
        </Grid>
        <Grid item xs={8} sm={10}>
          <p>{comment?.author?.name}</p>
          <p>{comment.body}</p>
        </Grid>
        {userId === comment.author._id ? (
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
              className="nn"
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose}>
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
