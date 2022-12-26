import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import memoriesLogo from "../../images/memories-Logo.png";
import memoriesText from "../../images/memories-Text.png";
import useMediaQuery from "@mui/material/useMediaQuery";

import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import { Link, useLocation, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { LogOut } from "../../features/auth/authSlice";
const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  // console.log("userstate", user);
  const matches = useMediaQuery("(min-width:600px)");

  const handleLogout = () => {
    dispatch(LogOut());

    setUser(null);
    navigate("/");
  };

  function randomColor() {
    let hex = Math.floor(Math.random() * 0xffffff);
    let color = "#" + hex.toString(16);

    return color;
  }

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = jwt_decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) handleLogout();
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: "#44b700",
      color: "#44b700",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    },
    ".MuiBadge-dot": {
      marginRight: "15px",
    },
  }));

  return (
    <AppBar
      sx={
        matches
          ? {
              borderRadius: 4,
              margin: "30px 0",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
            }
          : {
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }
      }
      position={matches ? "static" : "fixed"}
      color="inherit"
    >
      <Link
        to="/"
        style={{ display: "flex", alignItems: "center", marginLeft: "30px" }}
      >
        {matches ? (
          <img
            src={memoriesText}
            alt="memories"
            height="45px"
            style={{
              marginLeft: matches ? "5px" : "0",
            }}
          />
        ) : null}
        <img
          src={memoriesLogo}
          alt="memories"
          height="40px"
          style={{
            marginLeft: matches ? "10px" : "0",
            marginTop: matches ? "4px" : "0",
          }}
        />
      </Link>
      <Toolbar sx={{ mr: matches ? "30px" : "25px" }}>
        {user?.result ? (
          <Box style={{ display: "flex", alignItems: "center" }}>
            {matches ? (
              <Typography variant="h6">{user?.result.name}</Typography>
            ) : null}
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar
                alt={user?.result.name}
                src={user?.result.picture}
                sx={{ margin: "0 25px 0", bgcolor: randomColor() }}
                referrerpolicy="no-referrer"
              >
                {user?.result.name.charAt(0)}
              </Avatar>
            </StyledBadge>
            <Button
              onClick={handleLogout}
              variant="contained"
              color="secondary"
              sx={{ height: "45px" }}
            >
              Logout
            </Button>
          </Box>
        ) : (
          <Button
            onClick={() => {
              navigate("/auth");
            }}
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
