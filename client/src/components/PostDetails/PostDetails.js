import React, { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  Divider,
  Card,
  ButtonBase,
  CardMedia,
  CardContent,
  Grid,
  Button,
  Box,
  Grow,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useSelector, useDispatch } from "react-redux";
import * as dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  getPost,
  getPostsBySearch,
  update,
} from "../../features/posts/postsSlice";
import Errorhandler from "../Errorhandler";
import DeleteIcon from "@mui/icons-material/Delete";
import "./Styles.css";
import Modal from "../modal";
import CommentSection from "./CommentSection";
import Likes from "../Posts/Post/Likes";
import { likePost } from "../../features/api";
import { openModal } from "../../features/modal/modalSlice";
import Form from "../Form/Form";
import Skeleton from "@mui/material/Skeleton";
dayjs.extend(relativeTime);

const PostDetails = () => {
  const { posts, isLoading, error, post } = useSelector((store) => store.posts);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);

  useEffect(() => {
    setLikes(post?.likes);
  }, [post]);

  console.log("INDIpost", post);
  const [isOpenPosts, setIsOpenPosts] = useState(true);
  const [currentId, setCurrentId] = useState({ id: null, name: "" });
  const [updateForm, setUpdateForm] = useState(false);
  const [likes, setLikes] = useState(post?.likes);

  console.log("postLokes", likes);

  const user = JSON.parse(localStorage.getItem("profile"));
  const userId = user?.result?._id;

  const { isOpen } = useSelector((store) => store.modal);

  // const handleLike = async () => {
  //   console.log("post._idLike", post._id);
  //   const data = await likePost(post?._id);
  //   console.log("data", data);
  //   dispatch(update(data));
  // };
  const hasLikedPost = post?.likes.find((like) => like === userId);

  const handleLike = async () => {
    const data = await likePost(post?._id);
    console.log("data", data);
    dispatch(update(data));

    if (hasLikedPost) {
      setLikes(post.likes.filter((id) => id !== userId));
    } else {
      setLikes([...post.likes, userId]);
    }
  };

  useEffect(() => {
    if (post && post?._id === id) {
      dispatch(
        getPostsBySearch({ search: "none", tags: post?.tags.join(",") })
      );
    }
  }, [post, id]);

  useEffect(() => {
    setIsOpenPosts(true);
    setUpdateForm(false);
  }, []);

  if (!post) return null;

  const recommendedPosts = posts.filter(({ _id }) => _id !== post?._id);
  // console.log("recommendedPosts", recommendedPosts);

  return isLoading ? (
    <Grid
      container
      direction="row"
      justifyContent="space-evenly"
      alignItems="stretch"
      spacing={3}
    >
      <Grid item xs={12} sm={12} md={9}>
        <Skeleton
          variant="rounded"
          height={450}
          sx={{ borderRadius: "15px" }}
          animation="wave"
        />
        <Skeleton
          variant="rounded"
          height={450}
          sx={{ borderRadius: "15px", mt: "10px" }}
          animation="wave"
        />
      </Grid>
      <Grid item xs={12} sm={12} md={3}>
        <Skeleton
          variant="rounded"
          height={100}
          sx={{ borderRadius: "15px" }}
          animation="wave"
        />
      </Grid>
    </Grid>
  ) : !error ? (
    <>
      {isOpen && (
        <Modal
          currentId={currentId}
          setCurrentId={setCurrentId}
          detailsPage={true}
        />
      )}
      <Grid
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="stretch"
        spacing={3}
      >
        <Grow in={true}>
          <Grid item xs={12} sm={12} md={isOpenPosts || updateForm ? 9 : 12}>
            <Paper
              sx={{
                padding: "20px",
                borderRadius: "15px",
                mt: { xs: "6rem", sm: "auto" },
              }}
              elevation={6}
            >
              <Grid
                container
                alignItems="stretch"
                className="card"
                wrap="wrap-reverse"
                spacing={2}
              >
                <Grid item className="section" xs={12} sm={6} md={5}>
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
                      to={`/user/${post.creator._id}`}
                      style={{ textDecoration: "none", color: "#3f51b5" }}
                    >
                      {` ${post.creator.name}`}
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
                  {post?.creator?._id === user?.result?._id && (
                    <div
                      title="update Memory"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Button
                        style={{ color: "black" }}
                        size="small"
                        onClick={(e) => {
                          setCurrentId({ id: post?._id, name: "update" });
                          setUpdateForm(true);
                        }}
                      >
                        <MoreHorizIcon fontSize="medium" />
                      </Button>
                    </div>
                  )}
                  <Box
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

                    {post?.creator?._id === user?.result?._id && (
                      <Button
                        size="small"
                        color="error"
                        onClick={() => {
                          setCurrentId({ id: post?._id, name: "delete" });
                          dispatch(openModal());
                        }}
                      >
                        <DeleteIcon fontSize="small" sx={{ mr: "2px" }} />
                        Delete
                      </Button>
                    )}
                  </Box>
                  <Divider style={{ margin: "20px 0" }} />
                </Grid>
                <Grid item className="imageSection" xs={12} sm={6} md={7}>
                  <img
                    className="media"
                    src={
                      post.selectedFile ||
                      "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
                    }
                    alt={post.title}
                  />
                </Grid>
              </Grid>
            </Paper>
            <Paper
              sx={{
                padding: "20px",
                borderRadius: "15px",
                mt: { xs: "6rem", sm: "10px" },
              }}
              elevation={6}
            >
              <CommentSection post={post} user={user} />
            </Paper>
          </Grid>
        </Grow>
        <Grow in={true}>
          <Grid item xs={12} sm={12} md={3}>
            {updateForm && (
              <Box sx={{ mb: "20px" }}>
                <Paper elevation={6} sx={{ borderRadius: "15px" }}>
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button
                      onClick={() => setUpdateForm(false)}
                      sx={{ mx: 0, mt: "10px" }}
                    >
                      <CloseIcon sx={{ color: "grey" }} />
                    </Button>
                  </Box>
                  <Form
                    currentId={currentId}
                    setCurrentId={setCurrentId}
                    setUpdateForm={setUpdateForm}
                  />
                </Paper>
              </Box>
            )}
            {!!recommendedPosts.length && isOpenPosts ? (
              <Paper
                sx={{
                  padding: "20px",
                  borderRadius: "15px",
                  mt: { xs: "6rem", sm: "auto" },
                }}
                elevation={6}
              >
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button onClick={() => setIsOpenPosts(false)} sx={{ mx: 0 }}>
                    <CloseIcon sx={{ color: "grey" }} />
                  </Button>
                </Box>
                <div className="section">
                  <Typography gutterBottom variant="h5">
                    You might also like:
                  </Typography>
                  <Divider />
                  <div className="recommendedPosts">
                    {recommendedPosts.map(
                      ({
                        title,
                        creator,
                        message,
                        likes,
                        selectedFile,
                        _id,
                      }) => (
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
                              className="recommendedPostsImage"
                              sx={{
                                component: "div",
                                height: 0,
                                paddingTop: "56.25%",
                                backgroundColor: "rgba(0, 0, 0, 0.5)",
                                backgroundBlendMode: "darken",
                              }}
                              image={selectedFile}
                              title={title}
                              alt="memory_img"
                            />

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
                              By:- {creator.name}
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
                      )
                    )}
                  </div>
                </div>
              </Paper>
            ) : (
              isOpenPosts && (
                <Paper
                  sx={{
                    padding: "20px",
                    borderRadius: "15px",
                    mt: { xs: "6rem", sm: "auto" },
                  }}
                  elevation={6}
                >
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button
                      onClick={() => setIsOpenPosts(false)}
                      sx={{ mx: 0 }}
                    >
                      <CloseIcon sx={{ color: "grey" }} />
                    </Button>
                  </Box>
                  <Typography align="center" mt={1}>
                    No Suitable Post to recommend.
                  </Typography>
                </Paper>
              )
            )}
          </Grid>
        </Grow>
      </Grid>
    </>
  ) : (
    <Errorhandler error={error} />
  );
};

export default PostDetails;
