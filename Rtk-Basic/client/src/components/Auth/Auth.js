import React, { useState } from "react";
import {
  Avatar,
  Paper,
  Button,
  Grid,
  Typography,
  Container,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import "./Auth.css";
import { GoogleLogin } from "@react-oauth/google";
import Input from "./Input";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { LogIn } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { signin, signup, signinGoogle } from "../../features/api/";
import { toast } from "react-toastify";

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("formData", formData);
    if (isSignUp) {
      try {
        // const signupRes = await signup(formData);
        const signupRes = await toast.promise(signup(formData), {
          pending: "Hang on...",
          success: `Account Created Successfully!`,
        });
        // console.log("signup", signupRes);
        dispatch(LogIn(signupRes));
        navigate(-1);
      } catch (error) {
        console.log("error", error);
        toast.error(error?.response?.data.message);
      }
    } else {
      try {
        // const signinRes = await signin(formData);
        const signinRes = await toast.promise(signin(formData), {
          pending: "Hang on...",
          success: `Logged in Successfully!`,
        });
        console.log("signinRRRRRRRRRRR", signinRes);
        dispatch(LogIn(signinRes));
        navigate(-1);
      } catch (error) {
        // console.log("signinResError", error);
        toast.error(error?.response?.data.message);
      }
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevdata) => ({ ...prevdata, [name]: value }));
  };
  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };
  const switchMode = () => {
    setIsSignUp((prevState) => !prevState);
  };

  const googleSuccess = async (res) => {
    // const googleResponse = jwt_decode(res?.credential);
    try {
      // const googleResponse = await signinGoogle(res?.credential);
      const googleResponse = await toast.promise(
        signinGoogle(res?.credential),
        {
          pending: "Hang on...",
          success: `Logged in Successfully!`,
        }
      );

      console.log("result", googleResponse);
      const gLoginData = {
        result: googleResponse.result,
        token: googleResponse.token,
      };
      dispatch(LogIn(gLoginData));
      navigate(-1);
    } catch (error) {
      toast.error(error?.response?.data.message);
    }
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
              <>
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
              </>
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
                toast.error("Login Failed");
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
