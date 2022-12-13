import React, { useEffect, useState } from "react";

import { Container } from "@mui/material";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Navbar, Home, Auth, PostDetails, UserDetails } from "./components";

const App = () => {
  const user = JSON.parse(localStorage.getItem("profile"));

  return (
    <Router>
      <Container maxWidth="xl">
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Navigate to="/posts" />} />
          <Route path="/posts" exact element={<Home />} />
          <Route path="/posts/search" exact element={<Home />} />
          <Route path="/posts/:id" exact element={<PostDetails />} />

          <Route
            path="/auth"
            exact
            // element={!user ? <Auth /> : <Navigate to="/posts" />}
            element={<Auth />}
          />

          <Route path="/user/:id" exact element={<UserDetails />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;

// <Route path="/" exact element={<Home />} />
