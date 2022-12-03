import React, { useEffect } from "react";
import {
  Paper,
  CircularProgress,
  Typography,
  Divider,
  Box,
  useMediaQuery,
  Card,
  ButtonBase,
  CardMedia,
  CardContent,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import * as dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getPost, getPostsBySearch } from "../../features/posts/postsSlice";
import Errorhandler from "../Errorhandler";
import "./PostDetails.css";
dayjs.extend(relativeTime);

const PostDetails = () => {
  const { posts, isLoading, error, post } = useSelector((store) => store.posts);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log("post", post);

  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);

  useEffect(() => {
    if (post && post._id === id) {
      dispatch(
        getPostsBySearch({ search: "none", tags: post?.tags.join(",") })
      );
    }
  }, [post]);

  if (!post) return null;

  const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);

  return isLoading ? (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <CircularProgress size={70} />
    </div>
  ) : !error ? (
    <Paper
      sx={{
        padding: "20px",
        borderRadius: "15px",
        mt: { xs: "6rem", sm: "auto" },
      }}
      elevation={6}
    >
      <div className="card">
        <div className="section">
          <Typography variant="h3" component="h2">
            {post.title}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            color="textSecondary"
            component="h2"
          >
            {post?.tags?.map((tag, index) => (
              <Link
                key={index}
                to={`/tags/${tag}`}
                style={{ textDecoration: "none", color: "#3f51b5" }}
              >
                {` #${tag} `}
              </Link>
            ))}
          </Typography>
          <Typography gutterBottom variant="body1" component="p">
            {post.message}
          </Typography>
          <Typography variant="h6">
            Created by:
            <Link
              to={`/creators/${post.name}`}
              style={{ textDecoration: "none", color: "#3f51b5" }}
            >
              {` ${post.name}`}
            </Link>
          </Typography>
          <Typography variant="body1">
            {dayjs(post.createdAt).fromNow()}
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          <Typography variant="body1">
            <strong>Realtime Chat - coming soon!</strong>
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          <Divider style={{ margin: "20px 0" }} />
        </div>
        <div className="imageSection">
          <img
            className="media"
            src={
              post.selectedFile ||
              "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
            }
            alt={post.title}
          />
        </div>
      </div>
      {!!recommendedPosts.length && (
        <div className="section">
          <Typography gutterBottom variant="h5">
            You might also like:
          </Typography>
          <Divider />
          <div className="recommendedPosts">
            {recommendedPosts.map(
              ({ title, name, message, likes, selectedFile, _id }) => (
                <Card
                  key={_id}
                  raised
                  elevation={6}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    borderRadius: "15px",
                    height: "100%",
                    position: "relative",
                    m: "20px auto",
                    width: "400px",
                    // border: "0.5px solid rgba(0,0,0,0.45)",
                    // boxShadow: "12px 12px 0.5px black",
                  }}
                >
                  <ButtonBase
                    onClick={() => {
                      navigate(`/posts/${_id}`);
                    }}
                    component="span"
                    name="test"
                    sx={{ display: "block", textAlign: "initial" }}
                  >
                    <CardMedia
                      sx={{
                        component: "img",
                        height: 0,
                        paddingTop: "56.25%",
                      }}
                      image={selectedFile}
                      title={title}
                      alt="memory_img"
                    />

                    {/* <div
                      style={{
                        position: "absolute",
                        top: "20px",
                        left: "20px",
                        color: "white",
                      }}
                    >
                      <Typography variant="h6">{name}</Typography>
                    </div> */}

                    {/* <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        margin: "20px",
                      }}
                    >
                      <Typography variant="body2" color="textSecondary">
                        {tags.map((tag) => `#${tag} `)}
                      </Typography>
                    </div> */}
                    <Typography
                      sx={{ padding: "14px 16px" }}
                      variant="h5"
                      gutterBottom
                    >
                      {title}
                    </Typography>
                    <Typography
                      sx={{ padding: "4px 16px" }}
                      variant="body2"
                      gutterBottom
                      color="textSecondary"
                    >
                      By:- {name}
                    </Typography>
                    <CardContent>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {message}
                      </Typography>
                    </CardContent>
                  </ButtonBase>
                </Card>
                // <div
                //   style={{
                //     margin: "20px",
                //     cursor: "pointer",
                //   }}
                //   key={_id}
                //   onClick={() => {
                //     navigate(`/posts/${_id}`);
                //   }}
                // >
                //   <Typography gutterBottom variant="h6">
                //     {title}
                //   </Typography>
                //   <Typography gutterBottom variant="subtitle2">
                //     {name}
                //   </Typography>
                //   <Typography gutterBottom variant="subtitle2">
                //     {message}
                //   </Typography>
                //   <Typography gutterBottom variant="subtitle1">
                //     Likes: {likes.length}
                //   </Typography>
                //   <img src={selectedFile} width="200px" alt="display_picture" />
                // </div>
              )
            )}
          </div>
        </div>
      )}
    </Paper>
  ) : (
    <Errorhandler error={error} />
  );
};

export default PostDetails;
