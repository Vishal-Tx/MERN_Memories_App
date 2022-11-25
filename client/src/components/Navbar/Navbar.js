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
import memories from "../../images/memories.png";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LogOut } from "../../features/auth/authSlice";
const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  console.log("userstate", user);
  const matches = useMediaQuery("(min-width:600px)");

  const handleLogout = () => {
    setUser(null);
    dispatch(LogOut());
    navigate("/");
  };

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

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
      <div
        style={{ display: "flex", alignItems: "center", marginLeft: "30px" }}
      >
        <Typography
          sx={{
            color: "rgba(0,183,255, 1)",
            ml: matches ? "25px" : "8px",

            textDecoration: "none",
            fontSize: matches ? "auto" : "40px",
          }}
          variant="h2"
          align="center"
          component={Link}
          to="/"
        >
          {matches ? "Memories" : "M"}
        </Typography>
        {matches ? (
          <img
            src={memories}
            alt="memories"
            height="60"
            style={{
              marginLeft: matches ? "5px" : "0",
            }}
          />
        ) : null}
      </div>
      <Toolbar sx={{ mr: matches ? "30px" : "25px" }}>
        {user?.result ? (
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu}>
                <Avatar alt={user.result.name} src={user.result.picture}>
                  {user.result.name.charAt(0)}
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem>
                <Typography textAlign="center">{user.result.name}</Typography>
              </MenuItem>
              <MenuItem>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </MenuItem>
            </Menu>
          </Box>
        ) : (
          <Button
            component={Link}
            to="/auth"
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
