import React from "react";
import { useNavigate } from "react-router-dom";
import "../Main.css";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/Button";
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
      {/* <h3 style={{fontSize:'24px', textAlign:'center'}}>Logo</h3> */}
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
    </div>
  );
}

export default Main;
