import { AppBar, Avatar, Button, Toolbar, Typography } from "@mui/material";
import React from "react";
import memories from "../../images/memories.png";
import Link from "@mui/material/Link";
import useMediaQuery from "@mui/material/useMediaQuery";
const Navbar = () => {
  const user = null;
  const matches = useMediaQuery("(min-width:600px)");
  return (
    <AppBar
      sx={
        matches
          ? {
              borderRadius: 15,
              margin: "30px 0",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
            }
          : {
              top: "auto",
              bottom: 0,
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
          sx={{ color: "rgba(0,183,255, 1)", ml: matches ? "25px" : "8px" }}
          variant="h2"
          align="center"
          component={Link}
          href="/"
          underline="none"
        >
          {matches ? "Memories" : null}
        </Typography>
        <img
          src={memories}
          alt="memories"
          height="60"
          style={{
            marginLeft: matches ? "5px" : "0",
          }}
        />
      </div>
      <Toolbar sx={{ mr: matches ? "30px" : "25px" }}>
        {user ? (
          <div>
            <Avatar alt={user.result.name} src={user.result.imageUrl}>
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography variant="h6">{user.result.name}</Typography>
            <Button variant="contained" color="secondary" onClick={() => {}}>
              Logout
            </Button>
          </div>
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
