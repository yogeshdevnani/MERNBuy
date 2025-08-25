import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import "./account.css";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  ButtonGroup,
  Checkbox,
  FormControlLabel,
  InputLabel,
  Typography,
} from "@mui/material";
import { textAlign } from "@mui/system";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { grey } from "@mui/material/colors";
import Header from "../Header";
import axios from "axios";

function Account() {
  const [firstName, setFirstName] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [postalcode, setPostalCode] = useState("");

  const [lastName, setLastName] = useState("");
  const [errorMessageforFirstName, setErrorMessageForFirstName] = useState();
  const [errorMessageforLastName, setErrorMessageforLastName] = useState();
  const [errorMessageforAddress1, setErrorMessageforAddress1] = useState();

  const [errorMessageforCity, setErrorMessageforCity] = useState();
  const [errorMessageforProvince, setErrorMessageforProvince] = useState();
  const [errorMessageforPostalCode, setErrorMessageforPostalCode] = useState();
  const [submittedforPersonalDetails, setSubmittedforPersonalDetails] =
    useState(true);
  const [submittedforAddress, setSubmittedforAddress] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const EMPTY_FIELD = "Field cannot be empty!";
  const ALPHABET_ONLY = "Field can contain only alphabets!";
  const POSTAL_CODE =
    "POSTAL CODE should  be in any of these formats [ANA-NAN, ANA NAN,ANANAN]  'A' stands for Alphabets and 'N' stands for Numeric Value";
  const ALPHABET_REGEX = /^[a-zA-Z ]+$/;
  const NO_ERROR = "";
  const POSTAL_CODE_REGEX =
    /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i;

  const navigate = useNavigate();
  const primaryColor = "#2B2D42";
  const selectedColor = "#EF233C";
  const thirdcolor = "#8D99AE";

  useEffect(() => {
    //code
    const token = localStorage.getItem("Token");

    const headers = {
      Authorization: token,
    };
    // get API call to get the user first name and last name
    axios
      .get(
        process.env.REACT_APP_BACKEND_SERVER +
          "/account/getuserfirstandlastName",
        {
          headers: headers,
        }
      )
      .then((response) => {
        const output = response.data;

        if (output.responseStatus) {
          setFirstName(output.responseData.firstname);
          setLastName(output.responseData.lastname);
        }
      })
      .catch((response) => {
        console.log("response" + response);
      });

    // get call to get the user address details
    axios
      .get(process.env.REACT_APP_BACKEND_SERVER + "/account/getuseraddress", {
        headers: headers,
      })
      .then((response) => {
        const output = response.data;

        if (output.responseStatus) {
          setAddress1(output.responseData.address1);
          setAddress2(output.responseData.address2);
          setCity(output.responseData.city);
          setProvince(output.responseData.province);
          setPostalCode(output.responseData.pincode);
        }
      })
      .catch((response) => {
        console.log("response" + response);
      });
  }, []);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const changesInputValuesforpersonal = (e) => {
    const label = e.target.name;
    const value = e.target.value;

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

    if (firstName === "" || lastName === "") {
      setSubmittedforPersonalDetails(true);
    } else {
      setSubmittedforPersonalDetails(false);
    }
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

  const submituserAddress = (e) => {
    e.preventDefault();
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
    // post API call to update the user address
    axios
      .post(
        process.env.REACT_APP_BACKEND_SERVER + "/account/updateuseraddress",
        data,
        {
          headers: headers,
        }
      )
      .then((response) => {
        const output = response.data;

        if (output.responseStatus) {
          setAddress1(output.responseData.address1);
          setAddress2(output.responseData.address2);
          setCity(output.responseData.city);
          setProvince(output.responseData.province);
          setPostalCode(output.responseData.pincode);

          alert(output.responseMessage);
        } else {
          alert(output.responseMessage);
        }
      })
      .catch((response) => {
        console.log("response" + response);
      });
  };

  const submitUserfirstNameandLastName = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("Token");

    const headers = {
      Authorization: token,
    };

    const data = {
      firstname: firstName,
      lastname: lastName,
    };

    //post API call to update the first and last name
    axios
      .post(
        process.env.REACT_APP_BACKEND_SERVER +
          "/account/updateuserfirstandlastName",
        data,
        {
          headers: headers,
        }
      )
      .then((response) => {
        const output = response.data;

        if (output.responseStatus) {
          setFirstName(output.responseData.firstname);
          setLastName(output.responseData.lastname);
          alert(output.responseMessage);
        } else {
          alert(output.responseMessage);
        }
      })
      .catch((response) => {
        console.log("response" + response);
      });
  };
  const cancel = (e) => {
    e.preventDefault();

    navigate("/home");
  };

  const gotoOrderDetails = () => {
    navigate("/orderdetails");
  };

  return (
    <div className="account-details">
      <Header />
      <h1 style={{ textAlign: "center" }}>Account Settings</h1>

      <div className="accounts">
        <Accordion style={{ marginLeft: "10%", width: "80%" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>
              <b>Personal Details</b>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <TextField
                required
                label="First Name"
                className="textfield"
                size="small"
                type="text"
                name="firstName"
                value={firstName}
                onChange={changesInputValuesforpersonal}
              />
              <br></br>

              <p style={{ color: "Red", textAlign: "center" }}>
                <font color="red"> {errorMessageforFirstName}</font>
              </p>

              <TextField
                required
                label="Last Name"
                className="textfield"
                size="small"
                type="text"
                name="lastName"
                value={lastName}
                onChange={changesInputValuesforpersonal}
              />
              <p style={{ color: "Red", textAlign: "center" }}>
                <font color="red">{errorMessageforLastName}</font>
              </p>

              <Button
                variant="contained"
                sx={{
                  background: primaryColor,
                  textTransform: "none",
                  height: "2.5rem",
                  "&:hover": {
                    backgroundColor: selectedColor,
                  },
                }}
                className="btn-submit"
                disabled={
                  submittedforPersonalDetails ||
                  errorMessageforLastName ||
                  errorMessageforFirstName
                }
                onClick={submitUserfirstNameandLastName}
              >
                Submit
              </Button>

              <Button
                variant="contained"
                sx={{
                  ml: 5,
                  background: primaryColor,
                  textTransform: "none",
                  height: "2.5rem",
                  "&:hover": {
                    backgroundColor: thirdcolor,
                  },
                }}
                onClick={cancel}
              >
                Cancel
              </Button>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion style={{ marginLeft: "10%", width: "80%" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>
              <b>Address Details</b>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <TextField
                required
                label="Address Line 1"
                className="textfield"
                size="small"
                type="text"
                name="address1"
                value={address1}
                onChange={changeInputValuesforAddress}
              />
              <br></br>
              <p style={{ color: "Red", textAlign: "center" }}>
                <font color="red">{errorMessageforAddress1}</font>
              </p>

              <TextField
                label="Address line 2"
                className="textfield"
                size="small"
                type="text"
                name="address2"
                value={address2}
                onChange={changeInputValuesforAddress}
              />
              <p></p>
              <TextField
                required
                label="City"
                className="textfield"
                size="small"
                type="text"
                name="city"
                value={city}
                onChange={changeInputValuesforAddress}
              />
              <p style={{ color: "Red", textAlign: "center" }}>
                <font color="red">{errorMessageforCity}</font>
              </p>
              <TextField
                required
                label="Province"
                className="textfield"
                size="small"
                type="text"
                name="province"
                value={province}
                onChange={changeInputValuesforAddress}
              />
              <p style={{ color: "Red", textAlign: "center" }}>
                <font color="red">{errorMessageforProvince}</font>
              </p>
              <TextField
                required
                label="Postal code"
                className="textfield"
                size="small"
                type="text"
                name="postalcode"
                value={postalcode}
                onChange={changeInputValuesforAddress}
              />
              <p style={{ color: "Red", textAlign: "center" }}>
                <font color="red">{errorMessageforPostalCode}</font>
              </p>
              <Button
                sx={{
                  background: primaryColor,
                  textTransform: "none",
                  height: "2.5rem",
                  "&:hover": {
                    backgroundColor: selectedColor,
                  },
                }}
                variant="contained"
                className="btn-submit"
                disabled={
                  submittedforAddress ||
                  errorMessageforAddress1 ||
                  errorMessageforCity ||
                  errorMessageforProvince ||
                  errorMessageforPostalCode
                }
                onClick={submituserAddress}
              >
                Submit
              </Button>
              <Button
                variant="contained"
                sx={{
                  ml: 5,
                  background: primaryColor,
                  textTransform: "none",
                  height: "2.5rem",
                  "&:hover": {
                    backgroundColor: thirdcolor,
                  },
                }}
                onClick={cancel}
              >
                Cancel
              </Button>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <div className="account">
          <h2 style={{ textAlign: "center" }}>Check your Orders</h2>
          <Button
            sx={{
              background: primaryColor,
              textTransform: "none",
              height: "2.5rem",
              "&:hover": {
                backgroundColor: selectedColor,
              },
            }}
            variant="contained"
            onClick={gotoOrderDetails}
          >
            Orders
          </Button>
        </div>
      </div>
    </div>
  );
}
export default Account;
