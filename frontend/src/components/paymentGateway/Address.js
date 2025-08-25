import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router";
import Header from "../Header";
function Address() {
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [postalcode, setPostalCode] = useState("");
  const navigate = useNavigate();
  const [errorMessageforAddress1, setErrorMessageforAddress1] = useState();
  const [errorMessageforCity, setErrorMessageforCity] = useState();
  const [errorMessageforProvince, setErrorMessageforProvince] = useState();
  const [errorMessageforPostalCode, setErrorMessageforPostalCode] = useState();
  const [submittedforPersonalDetails, setSubmittedforPersonalDetails] =
    useState(true);
  const [submittedforAddress, setSubmittedforAddress] = useState(true);
  const EMPTY_FIELD = "Field cannot be empty!";
  const ALPHABET_ONLY = "Field can contain only alphabets!";
  const POSTAL_CODE =
    "POSTAL CODE should  be in any of these formats [ANA-NAN, ANA NAN,ANANAN]  'A' stands for Alphabets and 'N' stands for Numeric Value";
  const ALPHABET_REGEX = /^[a-zA-Z ]+$/;
  const NO_ERROR = "";
  const POSTAL_CODE_REGEX =
    /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i;

  const handleSubmit = (event) => {
    event.preventDefault();

    const token = localStorage.getItem("Token");

    const headers = {
      Authorization: token,
    };

    const data = {
      address1: address1,
      address2: address2,
      city: city,
      province: province,
      pincode: postalcode,
    };

    axios
      .post(
        process.env.REACT_APP_BACKEND_SERVER + "/payment/saveaddress",
        data,
        {
          headers: headers,
        }
      )
      .then((response) => {
        const output = response.data;
        if (output.responseStatus) {
          navigate("/checkout");
        }
      })
      .catch((response) => {
        console.log("Response", response);
      });
  };

  const changeInputValuesforAddress = (e) => {
    const label = e.target.name;
    const value = e.target.value;
    if (label === "address1") {
      if (value) {
        setErrorMessageforAddress1(NO_ERROR);
      } else {
        setErrorMessageforAddress1(EMPTY_FIELD);
      }
      setAddress1(value);
    }

    if (label === "address2") {
      setAddress2(value);
    }

    if (label === "city") {
      if (value) {
        ALPHABET_REGEX.test(value)
          ? setErrorMessageforCity(NO_ERROR)
          : setErrorMessageforCity(ALPHABET_ONLY);
      } else {
        setErrorMessageforCity(EMPTY_FIELD);
      }
      setCity(value);
    }

    if (label === "province") {
      if (value) {
        ALPHABET_REGEX.test(value)
          ? setErrorMessageforProvince(NO_ERROR)
          : setErrorMessageforProvince(ALPHABET_ONLY);
      } else {
        setErrorMessageforProvince(EMPTY_FIELD);
      }
      setProvince(value);
    }

    if (label === "postalcode") {
      if (value) {
        POSTAL_CODE_REGEX.test(value)
          ? setErrorMessageforPostalCode(NO_ERROR)
          : setErrorMessageforPostalCode(POSTAL_CODE);
      } else {
        setErrorMessageforPostalCode(EMPTY_FIELD);
      }
      setPostalCode(value);
    }

    if (
      address1 === "" ||
      city === "" ||
      province === "" ||
      postalcode === ""
    ) {
      setSubmittedforAddress(true);
    } else {
      setSubmittedforAddress(false);
    }
  };

  return (
    <div>
      <Header />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            width: "30%",
            margin: "auto",
            marginTop: "5rem",
          }}
        >
          <Typography
            variant="h4"
            sx={{ display: "flex", justifyContent: "center" }}
          >
            Address
          </Typography>
          <TextField
            id="street_address"
            label="Street Address"
            variant="outlined"
            name="address1"
            fullWidth
            style={{ margin: "10px", maxWidth: "400px" }}
            value={address1}
            // onChange={(event) => setAddress1(event.target.value)}
            onChange={changeInputValuesforAddress}
          />
          <p style={{ color: "Red", textAlign: "center" }}>
            <font color="red">{errorMessageforAddress1}</font>
          </p>

          <TextField
            id="street_address"
            label="Street Address"
            variant="outlined"
            fullWidth
            name="address2"
            style={{ margin: "10px", maxWidth: "400px" }}
            // margin="normal"
            value={address2}
            // onChange={(event) => setAddress2(event.target.value)}
            onChange={changeInputValuesforAddress}
          />
          <p> </p>
          <TextField
            id="city"
            label="City"
            variant="outlined"
            fullWidth
            name="city"
            style={{ margin: "10px", maxWidth: "400px" }}
            value={city}
            // onChange={(event) => setCity(event.target.value)}
            onChange={changeInputValuesforAddress}
          />
          <p style={{ color: "Red", textAlign: "center" }}>
            <font color="red">{errorMessageforCity}</font>
          </p>
          <TextField
            id="province"
            label="Province"
            variant="outlined"
            fullWidth
            name="province"
            style={{ margin: "10px", maxWidth: "400px" }}
            value={province}
            // onChange={(event) => setProvince(event.target.value)}
            onChange={changeInputValuesforAddress}
          />
          <p style={{ color: "Red", textAlign: "center" }}>
            <font color="red">{errorMessageforProvince}</font>
          </p>
          <TextField
            id="postalcode"
            label="Postal Code"
            variant="outlined"
            fullWidth
            name="postalcode"
            style={{ margin: "10px", maxWidth: "400px" }}
            value={postalcode}
            // onChange={(event) => setPostalCode(event.target.value)}
            onChange={changeInputValuesforAddress}
          />
          <p style={{ color: "Red", textAlign: "center" }}>
            <font color="red">{errorMessageforPostalCode}</font>
          </p>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginTop: "20px", display: "flex", alignSelf: "center" }}
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Address;
