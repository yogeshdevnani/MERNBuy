import { AttachMoney } from "@mui/icons-material";
import { Grid, Rating } from "@mui/material";
import React from "react";
import CartComponent from "./CartComponent";

//Displays the product information
function ProductInfo({ product }) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <img
          className="responsive-product-image"
          src={product?.imageThumbnailUrl}
          alt={product?.productId}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <div className="margin">
          <p className="heading-1">{product?.name}</p>

          <Grid container spacing={3}>
            <Grid item xs={6} md={4}>
              <div className="icon-div">
                <Rating
                  name="rating"
                  value={Math.round(product?.averageRating)}
                  precision={0.5}
                  readOnly
                />
              </div>
            </Grid>
            <Grid item xs={6} md={8}>
              <div className="icon-div">
                <AttachMoney
                  className="icon-styles"
                  color="green"
                  sx={{ marginLeft: "30px" }}
                />
                <p sx={{ marginTop: "5px" }}>{product?.price}</p>
              </div>
            </Grid>
          </Grid>
          <div className={"center-div"}>
            <strong className="heading-2">Product Description</strong>
          </div>
          <p>{product?.description}</p>
        </div>
      </Grid>
      <Grid item xs={12} md={4}>
        <CartComponent product={product} />
      </Grid>
    </Grid>
  );
}

export default ProductInfo;
