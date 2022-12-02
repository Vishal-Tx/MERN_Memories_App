import React, { useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getPosts } from "../../features/posts/postsSlice";

const Page = ({ page, currentId, search, tags }) => {
  const dispatch = useDispatch();
  const { currentPage, numberOfPages } = useSelector((state) => state.posts);
  console.log(currentPage, numberOfPages);

  useEffect(() => {
    if (page) dispatch(getPosts(page));
  }, [dispatch, page, currentId]);

  return (
    <Pagination
      count={numberOfPages}
      page={page}
      color="secondary"
      sx={{
        mt: "12px",
        py: "4px",
      }}
      renderItem={(item) => (
        <PaginationItem
          variant="text"
          component={Link}
          to={`/posts?page=${item.page}`}
          {...item}
        />
      )}
    />
  );
};

export default Page;
