import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useTable } from "react-table";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputLabel,
} from "@mui/material";
import { Image } from "@mui/icons-material";
import Header from "../Header";
import sony from "../../images/sonyheadphones.png";
import iphone from "../../images/iphone.png";
const OrderDetails = () => {
  const [order, setOrders] = useState([]);
  const [open, setOpen] = useState(false);
  const [orderName, setOrderName] = useState();
  const [orderNumber, setOrderNumber] = useState();
  const [orderDate, setOrderDate] = useState();
  const [amount, setAmount] = useState();
  const [address1, setAddress1] = useState();
  const [address2, setAddress2] = useState();
  const [city, setCity] = useState();
  const [province, setProvince] = useState();
  const [postalcode, setPostalCode] = useState();
  const [photo, setPhoto] = useState();
  const primaryColor = "#2B2D42";
  const selectedColor = "#EF233C";

  const viewOrderDetails = (row) => {
    setPhoto(row.photo);
    setAmount(row.Amount);
    setOrderDate(row.orderDate);
    setOrderName(row.orderName);
    setOrderNumber(row.orderNumber);
    setAddress1(row.address1);
    setAddress2(row.address2);
    setCity(row.city);
    setPostalCode(row.pincode);
    setProvince(row.province);

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getOrderDetails = () => {
    try {
      const token = localStorage.getItem("Token");

      const headers = {
        Authorization: token,
      };

      //  get order history of the user
      axios
        .get(
          process.env.REACT_APP_BACKEND_SERVER + "/account/getOrderDetails",
          {
            headers: headers,
          }
        )
        .then((response) => {
          const output = response.data;

          if (output.responseStatus) {
            setOrders(output.responseData);
          }
        })
        .catch((response) => {
          console.log("response" + response);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      name: "Product",
      selector: (row) => <img width={100} height={100} src={row.photo} />,
    },
    {
      name: "Order Name",
      selector: (row) => row.orderName,
    },
    {
      name: "Order Number",
      selector: (row) => row.orderNumber,
    },
    {
      name: "Order Date",
      selector: (row) => row.orderDate,
    },
    {
      name: "Amount",
      selector: (row) => row.Amount,
    },
    {
      name: "View",
      cell: (row) => (
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
          onClick={() => viewOrderDetails(row)}
        >
          View
        </Button>
      ),
    },
  ];

  useEffect(() => {
    getOrderDetails();
  }, []);

  return (
    <div>
      <Header />
      <h1 style={{ textAlign: "center" }}>Order Details</h1>
      <DataTable
        title="Order History"
        columns={columns}
        data={order}
        pagination
        fixedHeader
        fixedHeaderScrollHeight="500px"
        highlightOnHover
      />

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">{orderName}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <img src={photo} width={150} height={150} />
            <InputLabel>
              <b>Order Number:</b> {orderNumber}
            </InputLabel>
            <InputLabel>
              <b>Delivery Date:</b> {orderDate}
            </InputLabel>
            <InputLabel>
              <b>Amount:</b> {amount}
            </InputLabel>
          </DialogContentText>
          <h3>Delivery Address</h3>
          <DialogContentText id="alert-dialog-description">
            <InputLabel>
              <b>Address Line 1:</b>
              {address1}
            </InputLabel>
            <InputLabel>
              <b>Address Line 2:</b> {address2}
            </InputLabel>
            <InputLabel>
              <b>City:</b> {city}
            </InputLabel>
            <InputLabel>
              <b>Province:</b> {province}
            </InputLabel>
            <InputLabel>
              <b>postal Code:</b> {postalcode}
            </InputLabel>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default OrderDetails;
