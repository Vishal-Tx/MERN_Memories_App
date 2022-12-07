import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Errorhandler from "../../Errorhandler";
import { useLocation, useNavigate } from "react-router-dom";
import { getUser } from "../../../features/user/userSlice";
import { Avatar, Grid } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
dayjs.extend(relativeTime);

function randomColor() {
  let hex = Math.floor(Math.random() * 0xffffff);
  let color = "#" + hex.toString(16);

  return color;
}

const Comments = ({ comment }) => {
  const User = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // useEffect(() => {
  //   dispatch(getUser(commentCreator));
  // }, [location]);

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
        <Grid item xs={9} sm={11}>
          <p>{comment?.author?.name}</p>
          <p>{comment.body}</p>
        </Grid>
      </Grid>
    </div>
  );
};

export default Comments;
