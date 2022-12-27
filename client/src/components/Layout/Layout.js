import { Container } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const Layout = () => {
  return (
    <Container maxWidth="xl">
      <Navbar />
      <Outlet />
    </Container>
  );
};

export default Layout;
