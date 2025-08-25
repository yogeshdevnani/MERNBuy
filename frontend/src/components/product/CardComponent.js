import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

//Displays the cart details and cart buttons in a card
export function CardComponent(props) {
  const navigate = useNavigate();
  return (
    <div>
      <Card sx={{ maxWidth: 345 }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Cart Total: ${props.totalCost}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Quantity of this product: {Number(props.quantity).toFixed()}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Total {Number(props.totalItems).toFixed()} items added to cart
          </Typography>
          <div className="mt-4 center-buttons">
            <Link to="/address" className="link">
              <Button
                variant="contained"
                sx={{ minWidth: "100%" }}
                size="large"
                className="mb-3 button"
              >
                Checkout
              </Button>
            </Link>

            <Button
              variant="outlined"
              size="large"
              className="button-black"
              sx={{ minWidth: "100%", color: "#fff" }}
              onClick={() => navigate("/cart")}
            >
              View Cart
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
