import React from "react";
import { useNavigate } from "react-router-dom";
import "../Main.css";
import Button from "@mui/material/Button";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import DemoCredentialsBanner from "./DemoCredentialsBanner";
import Logo from "../images/logo.png";

function Main() {
  const primaryColor = "#2B2D42";
  const selectedColor = "#EF233C";
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const goTologin = () => {
    navigate("/login");
  };
  const goToRegistration = () => {
    navigate("/register");
  };

  return (
    <div id="main">
      <DemoCredentialsBanner />

      {/* Main Content with top margin to account for banner */}
      <Box sx={{ marginTop: "60px", textAlign: "center" }}>
        <img
          src={Logo}
          style={{ 
            maxWidth: isMobile ? "90%" : "360px", 
            height: "auto",
            maxHeight: isMobile ? "250px" : "400px",
            marginRight: isMobile ? "0" : "10px" 
          }}
          alt="MERN Buy Logo"
        />
        <div className="buttons">
          <Box 
            sx={{ 
              display: "flex", 
              flexDirection: isMobile ? "column" : "row",
              justifyContent: "center",
              mt: isMobile ? 2 : 0
            }}
          >
            <Button
              variant="contained"
              sx={{
                mb: isMobile ? 2 : 4,
                mr: isMobile ? 0 : 2,
                background: primaryColor,
                textTransform: "none",
                height: "2.5rem",
                width: isMobile ? "100%" : "auto",
                "&:hover": {
                  backgroundColor: selectedColor,
                },
              }}
              onClick={goTologin}
            >
              Login
            </Button>
            <Button
              variant="contained"
              sx={{
                mb: 4,
                background: primaryColor,
                textTransform: "none",
                height: "2.5rem",
                width: isMobile ? "100%" : "auto",
                "&:hover": {
                  backgroundColor: selectedColor,
                },
              }}
              onClick={goToRegistration}
            >
              Register
            </Button>
          </Box>
        </div>
      </Box>
    </div>
  );
}

export default Main;
