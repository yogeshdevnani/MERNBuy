import React, { useState } from "react";
import "../Main.css";
import { Link, useNavigate } from "react-router-dom";
import { Button, Grid, InputLabel, Radio, TextField } from "@mui/material";
import { sizeWidth } from "@mui/system";
import axios from "axios";

function Registration() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState("Buyer");

  const EMPTY_FIELD = "Field cannot be empty!";
  const ALPHABET_ONLY = "Field can contain only alphabets!";
  const EMAIL_ERROR = "Email is not valid!";
  const NO_ERROR = "";
  const ALPHABET_REGEX = /^[a-zA-Z ]+$/;
  const EMAIL_REGEX =
    /^[_A-Za-z0-9-\+]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$/;
  const PASSWORD_REGEX = /^[A-Za-z0-9\d@$!%*#?&]{8,}$/;
  const PASSWORD_ERROR =
    "Password should be alphanumeric and should be of minimum 8 charaters";
  const CONFIRMPASSWORD_ERROR = "Password and confirm password should be same";

  const [errorMessageforFirstName, setErrorMessageForFirstName] = useState();
  const [errorMessageforLastName, setErrorMessageforLastName] = useState();
  const [errorMessageforEmail, setErrorMessageforEmail] = useState();
  const [errorMessageforPassword, setErrorMessageforPassword] = useState();
  const [errorMessageforConfirmPassword, setErrorMessageforConfirmPassword] =
    useState();
  const [submitted, setSubmitted] = useState(true);
  const [message, setResponseMessage] = useState();
  const primaryColor = "#2B2D42";
  const selectedColor = "#EF233C";

  const navigate = useNavigate();

  const changesInputValues = (e) => {
    const label = e.target.name;
    const value = e.target.value;

    if (label === "userType") {
      setUserType(value);
    }

    if (label === "firstName") {
      if (value) {
        ALPHABET_REGEX.test(value)
          ? setErrorMessageForFirstName(NO_ERROR)
          : setErrorMessageForFirstName(ALPHABET_ONLY);
      } else {
        setErrorMessageForFirstName(EMPTY_FIELD);
      }

      setFirstName(value);
    }

    if (label === "lastName") {
      if (value) {
        ALPHABET_REGEX.test(value)
          ? setErrorMessageforLastName(NO_ERROR)
          : setErrorMessageforLastName(ALPHABET_ONLY);
      } else {
        setErrorMessageforLastName(EMPTY_FIELD);
      }

      setLastName(value);
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

    if (label === "password") {
      if (value) {
        PASSWORD_REGEX.test(value)
          ? setErrorMessageforPassword(NO_ERROR)
          : setErrorMessageforPassword(PASSWORD_ERROR);
      } else {
        setErrorMessageforPassword(EMPTY_FIELD);
      }

      setPassword(value);
    }

    if (label === "confirmpassword") {
      if (value) {
        if (value === password) {
          setErrorMessageforConfirmPassword(NO_ERROR);
        } else {
          setErrorMessageforConfirmPassword(CONFIRMPASSWORD_ERROR);
        }
      } else {
        setErrorMessageforConfirmPassword(EMPTY_FIELD);
      }

      setConfirmPassword(value);
    }

    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      setSubmitted(true);
    } else {
      setSubmitted(false);
    }
  };

  const submit = (e) => {
    e.preventDefault();
    const data = {
      email: email,
      password: password,
      firstname: firstName,
      lastname: lastName,
      usertype: userType,
    };
    // post call to  register the user
    axios
      .post(process.env.REACT_APP_BACKEND_SERVER + "/user/register", data)
      .then((response) => {
        const output = response.data;
        const token = output.token;
        if (output.status) {
          setResponseMessage(output.message);
          navigate("/login");
        } else {
          setResponseMessage(output.message);
        }
      })
      .catch((response) => {
        console.log("response" + response);
        setResponseMessage("Unable to register!");
      });
  };

  return (
    <div id="register">
      <h2 style={{ textAlign: "center" }}>Register User</h2>

      <Radio
        sx={{ ml: 9, mb: 1 }}
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

      {/* <InputLabel required sx={{ ml: 10  }} className="label"><b>First Name</b></InputLabel> */}
      <TextField
        required
        label="First Name"
        sx={{ ml: 9 }}
        size="small"
        type="text"
        name="firstName"
        value={firstName}
        onChange={changesInputValues}
      />
      <br></br>
      <p style={{ color: "Red", textAlign: "center" }}>
        {" "}
        <font color="red">{errorMessageforFirstName}</font>
      </p>

      {/* <InputLabel required sx={{ ml: 10  }} className="label"><b>Last Name</b></InputLabel> */}
      <TextField
        required
        label="Last Name"
        sx={{ ml: 9 }}
        size="small"
        type="text"
        name="lastName"
        value={lastName}
        onChange={changesInputValues}
      />
      <p style={{ color: "Red", textAlign: "center" }}>
        <font color="red">{errorMessageforLastName}</font>
      </p>

      {/* <InputLabel  required sx={{ ml: 10  }} className="label"><b>Email</b></InputLabel> */}
      <TextField
        required
        label="Email Address"
        sx={{ ml: 9 }}
        size="small"
        type="text"
        name="email"
        value={email}
        onChange={changesInputValues}
      />
      <p style={{ color: "Red", textAlign: "center" }}>
        <font color="red">{errorMessageforEmail}</font>
      </p>

      {/* <InputLabel  required sx={{ ml: 10  }} className="label"><b>Password</b></InputLabel> */}
      <TextField
        required
        label="Password"
        sx={{ ml: 9 }}
        size="small"
        type="password"
        name="password"
        value={password}
        onChange={changesInputValues}
      />
      <p style={{ color: "Red", textAlign: "center" }}>
        <font color="red">{errorMessageforPassword}</font>
      </p>

      {/* <InputLabel  required sx={{ ml: 10  }} className="label"><b>Confirm Password</b></InputLabel> */}
      <TextField
        required
        label="Confirm Password"
        sx={{ ml: 9 }}
        size="small"
        type="password"
        name="confirmpassword"
        value={confirmPassword}
        onChange={changesInputValues}
      />
      <p style={{ color: "Red", textAlign: "center" }}>
        <font color="red">{errorMessageforConfirmPassword}</font>
      </p>

      <Button
        variant="contained"
        sx={{
          ml: 16,
          mb: 2,
          mr: 20,
          background: primaryColor,
          textTransform: "none",
          height: "2.5rem",
          "&:hover": {
            backgroundColor: selectedColor,
          },
        }}
        disabled={
          submitted ||
          errorMessageforConfirmPassword ||
          errorMessageforEmail ||
          errorMessageforLastName ||
          errorMessageforFirstName
        }
        onClick={submit}
      >
        Submit
      </Button>
      <p style={{ color: "Red", textAlign: "center" }}>{message}</p>
      <Grid container>
        <Grid item xs>
          <Link to="/login" variant="body2">
            Already registered?Login
          </Link>
        </Grid>
      </Grid>
      {/* <button disabled={errorMessageforConfirmPassword || errorMessageforEmail || errorMessageforLastName || errorMessageforFirstName} className="button" onClick={submit}>Submit</button> */}
    </div>
  );
}

export default Registration;
