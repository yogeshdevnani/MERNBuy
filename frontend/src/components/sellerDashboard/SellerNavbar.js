import React from "react";
import { AppBar, Toolbar, Button } from "@mui/material";
import Box from "@mui/material/Box";
import AccountCircle from "@mui/icons-material/AccountCircle";

import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import { Link, useNavigate } from "react-router-dom";
import "./sellerdashboard.css";
import Logo from "../../images/logo.png";
function SellerNavbar() {
  const navigate = useNavigate();

  const logout = () => {
    const token = localStorage.getItem("Token");
    if (token) {
      localStorage.removeItem("Token");
      navigate("/");
    }
  };
  return (
    <Box sx={{ alignSelf: "stretch", heigh: "8vh" }}>
      <AppBar position="static" sx={{ bgcolor: "#FFFFFF", height: "60px" }}>
        <Toolbar>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "1rem",
              height: "100%",
            }}
          >
            <Link to="/sellerdashboard" id="links">
              <div>
                <img
                  style={{ height: "15rem", width: "15rem" }}
                  src={Logo}
                  alt="logo"
                />
                <b>
                  <font style={{ color: "black" }}> ║ Seller Dashboard</font>
                </b>
              </div>
            </Link>
          </Box>
          {/* <b>
            <font style={{ color: "black" }}> ║ Seller Dashboard</font>
          </b> */}
          <Button
            variant="contained"
            sx={{ marginLeft: "auto" }}
            id="buttons"
            onClick={logout}
          >
            <LogoutIcon />
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default SellerNavbar;
