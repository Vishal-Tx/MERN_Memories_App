import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Errorhandler from "../../Errorhandler";
import { useLocation, useNavigate } from "react-router-dom";
import { getUser } from "../../../features/user/userSlice";
import { Avatar } from "@mui/material";
dayjs.extend(relativeTime);

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
      <Avatar
        alt={comment?.author?.name}
        src={comment?.author?.picture}
        sx={{ margin: "0 25px 0" }}
      >
        {comment?.author?.name.charAt(0)}
      </Avatar>
      <p>{comment?.author?.name}</p>
      <p>{comment.body}</p>
    </div>
  );
};

export default Comments;
