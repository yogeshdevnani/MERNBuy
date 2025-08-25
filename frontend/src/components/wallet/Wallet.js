import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import "./wallet.css";
import Header from "../Header";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { useNavigate } from "react-router";

function Wallet() {
  const navigate = useNavigate();

  const [accountbalance, setAccountBalance] = useState("");
  const [amount, setAmount] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("Token");

    const headers = {
      Authorization: token,
    };

    axios
      .get(process.env.REACT_APP_BACKEND_SERVER + "/wallet/getwalletdetails", {
        headers: headers,
      })
      .then((response) => {
        const output = response.data;

        if (output.responseStatus) {
          setAccountBalance(output.responseData.accountbalance);
        }
      })
      .catch((response) => {
        console.log("response" + response);
      });
  }, []);

  const addMoneyHandler = async () => {
    let newbalance = parseInt(accountbalance) + parseInt(amount);
    let updatedBalance = {
      accountbalance: newbalance,
    };

    const token = localStorage.getItem("Token");

    const headers = {
      Authorization: token,
    };

    axios
      .put(
        process.env.REACT_APP_BACKEND_SERVER + "/wallet/updateWallet",
        updatedBalance,
        {
          headers: headers,
        }
      )
      .then((response) => {
        const output = response.data;
        if (output.responseStatus) {
          setAccountBalance(output.responseData.accountbalance);
        }
      })
      .catch((response) => {
        console.log("response" + response);
      });
  };
  return (
    <div>
      <Header />
      <div className="wallet">
        <div className="wallet-card">
          <Typography
            variant="h3"
            textAlign="center"
            sx={{ pb: 8, fontWeight: "bold" }}
          >
            <AccountBalanceWalletIcon sx={{ fontSize: "56px" }} /> Wallet{" "}
          </Typography>
          <Typography variant="h5">Account Balance:</Typography>
          <Typography variant="h1" sx={{ pb: 8 }} fontWeight={200}>
            ${accountbalance}
          </Typography>
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
            <OutlinedInput
              type="number"
              id="outlined-adornment-amount"
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              label="Amount"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
            />
          </FormControl>
          <Button
            variant="contained"
            sx={{ width: "fit-content", mt: 3 }}
            onClick={addMoneyHandler}
          >
            Add amount
          </Button>
          <Button
            variant="text"
            sx={{ width: "fit-content", mt: 3, ml: 3 }}
            onClick={() => navigate("/transaction")}
          >
            View Transactions
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Wallet;
