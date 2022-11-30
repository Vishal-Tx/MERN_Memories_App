import React from "react";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import {
  Link,
  MemoryRouter,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

const Page = () => {
  return (
    <Pagination
      count={10}
      page={1}
      color="secondary"
      sx={{
        borderRadius: "15px",
        mt: "12px",
        py: "2px",
      }}
      renderItem={(item) => (
        <PaginationItem component={Link} to={`/posts?age=${1}`} {...item} />
      )}
    />
  );
};

export default Page;
