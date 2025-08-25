import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import Product from "./Product";
import Grid from "@mui/material/Grid";

//this component will manage list of products
const ProductsList = ({ productsList }) => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        gridAutoRows: "1fr",
      }}
    >
      <Grid container spacing={3}>
        {productsList.map((productData) => {
          return (
            <Grid key={productData._id} item xs={3}>
              <Product key={productData._id} productData={productData} />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default ProductsList;
