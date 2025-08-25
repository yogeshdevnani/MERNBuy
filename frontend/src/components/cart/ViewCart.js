import {
  AddCircleOutlineOutlined,
  RemoveCircleOutlined,
} from "@mui/icons-material";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ViewCart.css";
const calculateTax = (totalCost) => {
  return totalCost * 0.15;
};

export function ViewCart() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [cartItems, setCartItems] = useState();
  const token = localStorage.getItem("Token");

  const [totalCost, setTotalCost] = useState();
  const fetchCartItems = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_SERVER}/cart/`,
      {
        headers: { Authorization: token },
      }
    );
    setCartItems(response.data.cartItems);
    setTotalCost(response.data.totalCost);
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  console.log(totalCost);
  const tax = calculateTax(totalCost);

  const handleCartProcess = async (product) => {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_SERVER}/cart/`,
      {
        productId: product.productId,
        name: product.name,
        description: product.description,
        price: product.price,
        averageRating: product.averageRating,
        totalRating: product.totalRating,
        category: product.category,
        quantity: 1,
        imageThumbnailUrl: product.imageThumbnailUrl,
      },
      {
        headers: { Authorization: token },
      }
    );

    setCartItems(response.data.cartItems);
    setCartItems(response.data.cartItems);
    setTotalCost(response.data.totalCost);
  };

  const handleRemoveCartProcess = async (productId) => {
    const response = await axios.delete(
      `${process.env.REACT_APP_BACKEND_SERVER}/cart/${productId}`,
      {
        headers: { Authorization: token },
      }
    );

    const cartItems = response.data.cartItems;

    setCartItems(cartItems);
    setCartItems(response.data.cartItems);
    setTotalCost(response.data.totalCost);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <CssBaseline />

      <h1 className="heading-2" style={{ marginTop: "1rem" }}>
        View Cart Page
      </h1>

      {cartItems?.length > 0 &&
        cartItems?.map((cartItem) => (
          <Grid
            container
            spacing={2}
            sx={{ margin: "0 1rem" }}
            className="margin-top"
            key={cartItem.name}
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Grid item xs={12} md={3}>
              <img
                src={cartItem.imageThumbnailUrl}
                style={{ height: "10rem", width: "10rem" }}
                className="mb-4 mt-5"
                alt={cartItem.id}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <p> {cartItem.name}</p>
            </Grid>
            <Grid item xs={12} md={3}>
              <p>
                {" "}
                <strong>Quantity: </strong>
                {cartItem.quantity}
              </p>
              <p>
                {" "}
                <strong>Cost: </strong> $
                {Number(
                  Number(cartItem.price).toFixed(2) * cartItem.quantity
                ).toFixed(2)}
              </p>
            </Grid>
            <Grid item xs={12} md={3}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <AddCircleOutlineOutlined
                  sx={{
                    color: "#2ecc71",
                    marginTop: "-1rem",
                    cursor: "pointer",
                    marginRight: "1rem",
                  }}
                  onClick={() => handleCartProcess(cartItem)}
                />
                <RemoveCircleOutlined
                  sx={{
                    color: "#d90429",
                    marginTop: "-1rem",
                    cursor: "pointer",
                  }}
                  onClick={() => handleRemoveCartProcess(cartItem.productId)}
                />
              </div>
            </Grid>
          </Grid>
        ))}

      <hr className="mt-4 mb-4" />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <p>
          <strong>Total Cost Without Tax: </strong>
          <span>${totalCost?.toFixed(2)}</span>
        </p>
        <p>
          <strong> Tax (15%): </strong>
          <span>${tax?.toFixed(2)}</span>
        </p>
        <p>
          <strong>Total Cost With Tax: </strong>
          <span>${(totalCost + tax)?.toFixed(2)}</span>
        </p>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        <Button
          variant="contained"
          size="large"
          className="mb-3 button"
          sx={{ minWidth: "40%" }}
          onClick={() => navigate("/address")}
        >
          Proceed To Checkout
        </Button>
      </div>
    </Box>
  );
}
