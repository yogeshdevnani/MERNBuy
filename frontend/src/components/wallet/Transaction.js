import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Header from "../Header";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router";

function Transaction() {
  let navigate = useNavigate();
  const [transactionData, setTransactionData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("Token");

    const headers = {
      Authorization: token,
    };

    axios
      .get(process.env.REACT_APP_BACKEND_SERVER + "/wallet/gettransactions", {
        headers: headers,
      })
      .then((response) => {
        const output = response.data;
        console.log(output);

        if (output.responseStatus) {
          setTransactionData(output.responseData);
          console.log(output.responseData);
        }
      })
      .catch((response) => {
        console.log("response" + response);
      });
  }, []);

  return (
    <div>
      <Header />
      <Typography
        variant="h4"
        textAlign="center"
        sx={{ py: 10, fontWeight: "bold" }}
      >
        My Transactions
      </Typography>
      <TableContainer sx={{ width: "60%", m: "auto" }} component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                Type
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                Amount
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                Source
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactionData.map((transaction) => (
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {transaction.date}
                </TableCell>
                <TableCell align="right">{transaction.type}</TableCell>
                <TableCell align="right">{transaction.amount}</TableCell>
                <TableCell align="right">{transaction.source}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="contained"
        sx={{ marginLeft: "45%", mt: 3 }}
        onClick={() => navigate("/wallet")}
      >
        Go Back
      </Button>
      {/* ))}</p> */}
    </div>
  );
}

export default Transaction;
