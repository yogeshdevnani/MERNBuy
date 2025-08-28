import React from "react";
import { useNavigate } from "react-router-dom";
import "../Main.css";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/Button";
import { Box, Typography, Paper } from "@mui/material";
import DemoCredentialsBanner from "./DemoCredentialsBanner";
import Logo from "../images/logo.png";
function Main() {
  const primaryColor = "#2B2D42";
  const selectedColor = "#EF233C";
  const navigate = useNavigate();

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
      <Box sx={{ marginTop: "60px" }}>
        <img
          src={Logo}
          width="360"
          height="400"
          style={{ marginRight: "10px" }}
        />
        <div className="buttons">
          <div>
            <Button
              variant="contained"
              sx={{
                ml: 9,
                mr: 2,
                mb: 4,
                background: primaryColor,
                textTransform: "none",
                height: "2.5rem",
                "&:hover": {
                  backgroundColor: selectedColor,
                },
              }}
              onClick={goTologin}
            >
              Login
            </Button>
            <Button
              Button
              variant="contained"
              sx={{
                ml: 1,
                mb: 4,
                background: primaryColor,
                textTransform: "none",
                height: "2.5rem",
                "&:hover": {
                  backgroundColor: selectedColor,
                },
              }}
              onClick={goToRegistration}
            >
              Register
            </Button>
          </div>
        </div>
      </Box>
    </div>
  );
}

export default Main;
