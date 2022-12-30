import { Box, Typography } from "@mui/material";
import React from "react";

const Errorhandler = ({ error }) => {
  // console.log("Errorhandler", error);
  return (
    <Box
      sx={{
        height: "100vh",
      }}
    >
      <Typography sx={{ color: "#1565c0", fontSize: "100px" }} align="center">
        {error.status}
      </Typography>
      <Typography sx={{ color: "#1565c0", fontSize: "80px" }} align="center">
        {error?.data?.message ? error?.data?.message : "Try Refresh"}
      </Typography>
    </Box>
  );
};

export default Errorhandler;
