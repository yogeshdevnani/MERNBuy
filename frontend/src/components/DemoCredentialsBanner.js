import React from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";

const DemoCredentialsBanner = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
        padding: isMobile ? "8px 10px" : "12px 20px",
        textAlign: "center",
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
      }}
    >
      <Typography
        variant="body2"
        sx={{
          fontWeight: 500,
          fontSize: isMobile ? "0.7rem" : "0.875rem",
          lineHeight: isMobile ? 1.4 : 1.5,
        }}
      >
        👋 <strong>For Recruiters:</strong> Don't want to sign up?
        <br style={{ display: isMobile ? "block" : "none" }} />
        Use demo credentials → <strong>(Customer)</strong> user@domain.com
        <br style={{ display: isMobile ? "block" : "none" }} />
        <strong>(Seller)</strong> seller@domain.com | <strong>Password:</strong>{" "}
        admin123
      </Typography>
    </Box>
  );
};

export default DemoCredentialsBanner;
