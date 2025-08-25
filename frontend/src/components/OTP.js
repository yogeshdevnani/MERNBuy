import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import "../Main.css";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  InputLabel,
  Radio,
} from "@mui/material";
import axios from "axios";

function OTP() {
  const [userType, setUserType] = useState("Buyer");
  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");
  const [otpfrombackend, setOTPfromBackend] = useState();

  const [submitted, setSubmitted] = useState(true);
  const [sendresponse, setSendresponse] = useState();

  const [message, setResponseMessage] = useState();

  const [errorMessageforOTP, setErrorMessageforOTP] = useState("");
  const [errorMessageforEmail, setErrorMessageforEmail] = useState("");

  const EMAIL_REGEX =
    /^[_A-Za-z0-9-\+]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$/;
  const EMAIL_ERROR = "Email is not valid!";
  const EMPTY_FIELD = "Field cannot be empty!";
  const OTP_REGEX = /^[0-9]{6}$/;
  const NO_ERROR = "";
  const OTP_ERROR = "OTP should be of 6 charaters only!";
  const OTP_MISMATCH =
    "OTP does not match please click on send button to receive new OTP!";
  const primaryColor = "#2B2D42";
  const selectedColor = "#EF233C";

  const navigate = useNavigate();

  const changesInputValues = (e) => {
    const label = e.target.name;
    const value = e.target.value;
    if (label === "userType") {
      setUserType(value);
    }

    if (label === "email") {
      if (value) {
        EMAIL_REGEX.test(value)
          ? setErrorMessageforEmail(NO_ERROR)
          : setErrorMessageforEmail(EMAIL_ERROR);
      } else {
        setErrorMessageforEmail(EMPTY_FIELD);
      }
      setEmail(value);
    }

    if (label === "otp") {
      if (value) {
        OTP_REGEX.test(value)
          ? setErrorMessageforOTP(NO_ERROR)
          : setErrorMessageforOTP(OTP_ERROR);
      } else {
        setErrorMessageforOTP(EMPTY_FIELD);
      }
      setOTP(value);
    }

    if (otp === "") {
      setSubmitted(true);
    } else {
      setSubmitted(false);
    }
  };

  const submit = (e) => {
    e.preventDefault();

    if (otp === otpfrombackend) {
      localStorage.setItem("isreset", true);
      navigate("/reset", {
        state: {
          email: email,
          userType: userType,
        },
      });
      setSendresponse(NO_ERROR);
      setErrorMessageforOTP(NO_ERROR);
    } else {
      setErrorMessageforOTP(OTP_MISMATCH);
      setSendresponse(NO_ERROR);
    }
  };

  const send = (e) => {
    const data = {
      usertype: userType,
      email: email,
    };
    // post call to get the otp
    axios
      .post(process.env.REACT_APP_BACKEND_SERVER + "/user/otp", data)
      .then((response) => {
        const output = response.data;
        const token = output.token;
        if (output.status) {
          setSendresponse(output.message);
          setErrorMessageforOTP(NO_ERROR);
          setOTPfromBackend(output.otp.toString());
        } else {
          setSendresponse("Please click on send button again");
        }
      })
      .catch((response) => {
        console.log("response" + response);
        setResponseMessage("Incorrect password or Email!");
      });
  };

  return (
    <div id="login">
      <h2 style={{ textAlign: "center" }}>OTP Page</h2>
      <Radio
        sx={{ ml: 10, mb: 1 }}
        type="radio"
        name="userType"
        value="Buyer"
        id="Buyer"
        checked={userType === "Buyer"}
        onChange={changesInputValues}
      />
      <label htmlFor="Buyer">Buyer</label>

      <Radio
        sx={{ ml: 1, mb: 1 }}
        type="radio"
        name="userType"
        value="Seller"
        id="Seller"
        checked={userType === "Seller"}
        onChange={changesInputValues}
      />
      <label htmlFor="Seller">Seller</label>
      <br></br>

      {/* <InputLabel required sx={{ ml: 10  }} className="label"><b>Email</b></InputLabel> */}
      <TextField
        label="Email Address"
        sx={{ ml: 10, mb: 1 }}
        margin="normal"
        type="text"
        name="email"
        value={email}
        onChange={changesInputValues}
      />
      <p style={{ color: "Red", textAlign: "center" }}>
        <font color="red"> {errorMessageforEmail}</font>
      </p>

      {/* <InputLabel required sx={{ ml: 10  }} className="label"><b>Email</b></InputLabel> */}
      <TextField
        label="Enter OTP"
        sx={{ ml: 10, mb: 1 }}
        margin="normal"
        type="text"
        name="otp"
        value={otp}
        onChange={changesInputValues}
      />
      <p style={{ color: "Red", textAlign: "center" }}>
        <font color="red">{errorMessageforOTP}</font>
      </p>
      <p style={{ color: "Blue", textAlign: "center" }}>
        <font color="red">{sendresponse}</font>
      </p>
      <Button
        variant="contained"
        sx={{
          ml: 10,
          mr: 2,
          background: primaryColor,
          textTransform: "none",
          height: "2.5rem",
          "&:hover": {
            backgroundColor: selectedColor,
          },
        }}
        disabled={submitted || errorMessageforOTP}
        onClick={submit}
      >
        Verify
      </Button>
      <Button
        variant="contained"
        sx={{
          ml: 1,
          background: primaryColor,
          textTransform: "none",
          height: "2.5rem",
          "&:hover": {
            backgroundColor: selectedColor,
          },
        }}
        onClick={send}
      >
        Send
      </Button>
    </div>
  );
}

export default OTP;
