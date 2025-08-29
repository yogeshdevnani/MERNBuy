import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import errorImage from "../images/status_404_not_found.jpg";

//this component will display error page
function ErrorPage() {
  const isLoggedIn = localStorage.getItem("Token");

  return (
    <Box>
      {/* Show Header only if logged in */}
      {isLoggedIn && <Header />}

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          minHeight: "100vh",
          padding: "2rem",
        }}
      >
        {/* Login prompt for non-logged users */}
        {!isLoggedIn && (
          <Button
            component={Link}
            to="/login"
            sx={{ marginBottom: "2rem", fontSize: "1.2rem" }}
          >
            Try logging in
          </Button>
        )}

        {/* 404 Message */}
        <Typography
          variant="h2"
          sx={{
            color: "black",
            fontWeight: "bold",
            marginBottom: "2rem",
            textAlign: "center",
          }}
        >
          404 - Page Not Found
        </Typography>

        {/* Your 404 Image */}
        <img
          src={errorImage}
          alt="404 Not Found"
          style={{ maxWidth: "500px", width: "100%" }}
        />
      </Box>
    </Box>
  );
}

export default ErrorPage;
