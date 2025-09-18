import { Box, Link } from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

const Footer = () => {
  return (
    <Box
      sx={{
        height: "auto",
        minHeight: "7vh",
        background: "#444444",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        paddingRight: "2rem",
        paddingLeft: "2rem",
        flexDirection: "column",
        justifyContent: "center",
        marginTop: "auto",
        padding: "1rem",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "0.5rem",
        }}
      >
        <Link
          component={RouterLink}
          to="/terms"
          sx={{
            color: "white",
            fontSize: "0.9rem",
            fontWeight: "bold",
            textDecoration: "underline",
            "&:hover": {
              color: "white",
              textDecoration: "underline",
            },
          }}
        >
          Terms & Conditions
        </Link>

        <Link
          href="https://github.com/yogeshdevnani/MERNBuy"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            color: "white",
            fontSize: "0.9rem",
            fontWeight: "bold",
            textDecoration: "underline",
            "&:hover": {
              color: "white",
              textDecoration: "underline",
            },
          }}
        >
          View Source Code
        </Link>
      </Box>

      <Box
        sx={{
          color: "white",
          fontSize: "0.9rem",
          marginBottom: "0.2rem",
          fontWeight: "bold",
        }}
      >
        Developed by{" "}
        <Link
          href="https://linkedin.com/in/yogeshdevnani"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            color: "white",
            textDecoration: "underline",
            fontWeight: "bold",
            "&:hover": {
              color: "white",
              textDecoration: "underline",
            },
          }}
        >
          Yogesh 🤍
        </Link>
      </Box>
    </Box>
  );
};

export default Footer;
