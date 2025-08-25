import { Box, Button, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//this component will showcase the wishlisted items and manage
const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const token = localStorage.getItem("Token");
  const navigate = useNavigate();
  const primaryColor = "#2B2D42";
  const selectedColor = "#EF233C";

  const fetchWishlist = async () => {
    const tempWishlist = await axios.get(
      `${process.env.REACT_APP_BACKEND_SERVER}/wishlist`,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    setWishlist(tempWishlist.data[0].products);
  };

  const deleteFromWishlist = async (item) => {
    await axios.post(
      `${process.env.REACT_APP_BACKEND_SERVER}/wishlist/delete`,
      {
        productId: item.productId,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    fetchWishlist();
  };

  const handleProductClick = (item) => {
    console.log("test", item);
    navigate(`/product`, {
      state: {
        id: item.productId,
      },
    });
  };

  useEffect(() => {
    fetchWishlist();
  }, []);
  return (
    <Box>
      {wishlist.map((item) => {
        return (
          <Box
            key={item._id}
            sx={{
              width: "50%",
              margin: "auto",
              paddingTop: "2rem",
              flexGrow: 1,
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <LazyLoadImage
                  onClick={() => handleProductClick(item)}
                  src={item.imageThumbnailUrl}
                  width={"50%"}
                  style={{
                    maxWidth: "30rem",
                    cursor: "pointer",
                  }}
                  height={"70%"}
                  alt={item.name}
                />
              </Grid>
              <Grid item xs={8}>
                <p
                  style={{
                    textDecoration: "none",
                    color: primaryColor,
                    "&:hover": { color: selectedColor },
                    cursor: "pointer",
                  }}
                  onClick={() => handleProductClick(item)}
                >
                  {item.name}
                </p>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    paddingTop: "1rem",
                    paddingBottom: "1rem",
                    width: "100%",
                  }}
                >
                  <Button
                    aria-label="Delete"
                    sx={{
                      background: primaryColor,
                      textTransform: "none",
                      height: "2.5rem",
                      width: "7rem",
                      "&:hover": {
                        backgroundColor: selectedColor,
                      },
                    }}
                    onClick={() => deleteFromWishlist(item)}
                    variant="contained"
                  >
                    Delete
                  </Button>
                </Box>
              </Grid>
            </Grid>
            <Divider sx={{ background: "black", borderBlockWidth: 1 }} />
          </Box>
        );
      })}
    </Box>
  );
};

export default Wishlist;
