import React, { useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getPosts } from "../../features/posts/postsSlice";
import { useGetPostsQuery } from "../../features/apiSlice";

const Page = ({ page, currentId, queryRes }) => {
  const dispatch = useDispatch();
  // const { currentPage, numberOfPages } = useSelector((state) => state.posts);
  // const {
  //   data: { currentPage, numberOfPages },
  // } = queryRes;
  let currentPage = queryRes.data?.currentPage;
  let numberOfPages = queryRes.data?.numberOfPages;
  // console.log("qData", data);

  //Main
  // useEffect(() => {
  //   if (page) dispatch(getPosts(page));
  // }, [page, currentId]);

  return (
    <Pagination
      count={numberOfPages}
      page={currentPage}
      color="secondary"
      sx={{
        mt: "12px",
        py: "4px",
        display: "flex",
        justifyContent: "center",
      }}
      renderItem={(item) => {
        console.log("item", item);
        return (
          <PaginationItem
            variant="text"
            component={Link}
            to={`/posts?page=${item.page}`}
            {...item}
          />
        );
      }}
    />
  );
};

export default Page;
