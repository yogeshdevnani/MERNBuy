import { Box, Link } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <Box
      sx={{
        height: "7vh",
        background: "#444444",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        paddingRight: "2rem",
        flexDirection: "column",
        justifyContent: "center",
        marginTop: "auto",
      }}
    >
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
      <Box>
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
    </Box>
  );
};

export default Footer;
