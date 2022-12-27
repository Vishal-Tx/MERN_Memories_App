import React, { useEffect, useState } from "react";

import { Container } from "@mui/material";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Navbar, Home, Auth, PostDetails, UserDetails } from "./components";
import Layout from "./components/Layout/Layout";

const App = () => {
  const user = JSON.parse(localStorage.getItem("profile"));

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/posts" />} />

          <Route path="posts">
            <Route index exact element={<Home />} />
            <Route path="search" exact element={<Home />} />
            <Route path=":id" exact element={<PostDetails />} />
          </Route>

          <Route
            path="/auth"
            exact
            // element={!user ? <Auth /> : <Navigate to="/posts" />}
            element={<Auth />}
          />

          <Route path="/user/:id" exact element={<UserDetails />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;

// <Route path="/" exact element={<Home />} />
