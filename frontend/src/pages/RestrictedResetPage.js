import { Box } from "@mui/material";
import React from "react";
import ErrorPage from "./ErrorPage";
import Reset from "../components/reset";

const RestrictedResetPage = () => {
  return (
    <Box>
      {localStorage.getItem("isreset") ? (
        <Box>
          <Reset />
        </Box>
      ) : (
        <ErrorPage />
      )}
    </Box>
  );
};

export default RestrictedResetPage;
