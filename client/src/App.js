import React from "react";

import { Container } from "@mui/material";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  redirect,
} from "react-router-dom";
import { Navbar, Home, Auth, PostDetails } from "./components";

const App = () => {
  return (
    <Router>
      <Container maxWidth="xl">
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Navigate to="/posts" />} />
          <Route path="/posts" exact element={<Home />} />
          <Route path="/posts/search" exact component={Home} />
          <Route path="/posts/:id" exact component={PostDetails} />

          <Route path="/auth" exact element={<Auth />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;

// <Route path="/" exact element={<Home />} />
