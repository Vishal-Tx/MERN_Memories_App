import React, { useState } from "react";
import {
  Avatar,
  Paper,
  Button,
  Grid,
  Typography,
  Container,
  TextField,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import "./Auth.css";
import { GoogleLogin } from "@react-oauth/google";
import Input from "./Input";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { LogIn } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleChange = () => {};
  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };
  const switchMode = () => {
    setIsSignUp((prevState) => !prevState);
    handleShowPassword(false);
  };

  const googleSuccess = (res) => {
    const result = jwt_decode(res?.credential);
    const { name, picture, sub } = result;
    dispatch(LogIn({ name, picture, sub }));
    navigate("/");
  };
  return (
    <Container component="main" maxWidth="xs">
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: "60px",
          padding: "20px",
        }}
      >
        <Avatar sx={{ margin: "2px", bgcolor: "#e91e63" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignUp ? "Sign Up" : "sign In"}</Typography>
        <form
          style={{ width: "100%", marginTop: "20px" }}
          onSubmit={handleSubmit}
        >
          <Grid container spacing={2}>
            {isSignUp && (
              <div>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </div>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignUp && (
              <Input
                name="confirmPassword"
                label="Confirm Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ margin: "20px 0 15px" }}
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </Button>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <GoogleLogin
              onSuccess={googleSuccess}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </div>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode} color="primary">
                {isSignUp
                  ? "Already have an Account? Sign In"
                  : "Don't have an Account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
