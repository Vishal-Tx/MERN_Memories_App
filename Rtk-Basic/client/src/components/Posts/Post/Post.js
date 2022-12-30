import React, { useState } from "react";
import {
  Card,
  CardActions,
  CardMedia,
  CardContent,
  Button,
  Typography,
  ButtonBase,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import * as dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { openModal } from "../../../features/modal/modalSlice";
import { likePost } from "../../../features/api";
import { update } from "../../../features/posts/postsSlice";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import Likes from "./Likes";
import Tooltip from "@mui/material/Tooltip";
dayjs.extend(relativeTime);

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("profile"));
  const userId = user?.result?._id;

  const [likes, setLikes] = useState(post?.likes);
  const hasLikedPost = post.likes.find((like) => like === userId);

  // const handleLike = async () => {
  //   const data = await likePost(post._id);
  //   dispatch(update(data));
  // };
  console.log("likes", likes);
  const handleLike = async () => {
    const data = await likePost(post._id);
    dispatch(update(data));

    if (hasLikedPost) {
      setLikes(post.likes.filter((id) => id !== userId));
    } else {
      setLikes([...post.likes, userId]);
    }
  };
  // const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const openPost = () => {
    navigate(`/posts/${post._id}`);
  };

  // const { authData } = useSelector((store) => store.auth);

  // useEffect(() => {
  //   setUser(JSON.parse(localStorage.getItem("profile")));
  // }, [authData]);

  // const Likes = () => {
  //   if (post.likes.length > 0) {
  //     return post.likes.find((like) => like === userId) ? (
  //       <>
  //         <ThumbUpIcon fontSize="small" sx={{ mr: "4px" }} />
  //         &nbsp;
  //         {post.likes.length > 2
  //           ? `You and ${post.likes.length - 1} others`
  //           : `${post.likes.length} like${post.likes.length > 1 ? "s" : ""}`}
  //       </>
  //     ) : (
  //       <>
  //         <ThumbUpOffAltIcon fontSize="small" />
  //         &nbsp;{post.likes.length} {post.likes.length === 1 ? "Like" : "Likes"}
  //       </>
  //     );
  //   }
  //   return (
  //     <>
  //       <ThumbUpOffAltIcon fontSize="small" />
  //       &nbsp;Like
  //     </>
  //   );
  // };

  return (
    <Card
      className="card"
      raised
      elevation={6}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: "15px",
        height: "100%",
        position: "relative",

        // border: "0.5px solid rgba(0,0,0,0.45)",
        // boxShadow: "12px 12px 0.5px black",
      }}
    >
      <ButtonBase
        onClick={openPost}
        component="span"
        name="test"
        sx={{ display: "inline-block", textAlign: "initial" }}
      >
        <CardMedia
          className="cardMedia"
          sx={{
            component: "div",
            height: 0,
            paddingTop: "56.25%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            backgroundBlendMode: "darken",
            borderRadius: "15px 15px 0 0",
          }}
          image={post.selectedFile}
          title={post.title}
          alt="memory_img"
        />

        <div
          className="cardText"
          style={{
            position: "absolute",
            top: "20px",
            left: "20px",
            color: "white",
          }}
        >
          <Typography variant="h6">
            {post?.creator?.name?.split(" ")[0]}
          </Typography>
          <Typography variant="body2">
            {dayjs(post.createdAt).fromNow()}
          </Typography>
        </div>
        {/* {(post?.creator === user?.result?.sub ||
          post?.creator === user?.result?._id) && (
          <div
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              color: "white",
            }}
          >
            <Button
              style={{ color: "white" }}
              size="small"
              onClick={(e) => {
                setCurrentId({ id: post._id, name: "update" });
              }}
            >
              <MoreHorizIcon fontSize="medium" />
            </Button>
          </div>
        )} */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "20px",
          }}
        >
          <Typography variant="body2" color="textSecondary">
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
        </div>
        <Typography sx={{ padding: "0 16px" }} variant="h5" gutterBottom>
          {post.title}
        </Typography>

        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {post.message}
          </Typography>
        </CardContent>
      </ButtonBase>
      {post?.creator._id === user?.result?._id && (
        <div
          style={{
            position: "relative",
            margin: "auto",
          }}
        >
          <Tooltip title="update Memory" placement="top-end" arrow>
            <Button
              style={{ color: "black" }}
              size="small"
              onClick={(e) => {
                setCurrentId({ id: post._id, name: "update" });
              }}
            >
              <MoreHorizIcon fontSize="medium" />
            </Button>
          </Tooltip>
        </div>
      )}
      <CardActions
        sx={{
          padding: "0 16px 8px 16px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button
          size="small"
          color="primary"
          onClick={handleLike}
          disabled={!user?.result}
        >
          <Likes likes={likes} userId={userId} />
        </Button>

        {post?.creator._id === user?.result?._id && (
          <Button
            size="small"
            color="error"
            onClick={() => {
              setCurrentId({ id: post._id, name: "delete" });
              dispatch(openModal());
            }}
          >
            <DeleteIcon fontSize="small" sx={{ mr: "2px" }} />
            Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
