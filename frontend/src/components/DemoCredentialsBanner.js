import React from "react";
import { Box, Typography } from "@mui/material";

const DemoCredentialsBanner = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: "linear-gradient(135deg, #EF233C 0%, #DDDDDD 100%)",
        color: "white",
        padding: "12px 20px",
        textAlign: "center",
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
      }}
    >
      <Typography variant="body2" sx={{ fontWeight: 500 }}>
        👋 <strong>For Recruiters:</strong> Don't want to sign up? Use demo
        credentials → <strong>Email:</strong> user@domain.com |{" "}
        <strong>Password:</strong> admin123
      </Typography>
    </Box>
  );
};

export default DemoCredentialsBanner;
