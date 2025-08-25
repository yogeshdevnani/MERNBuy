import { Box, Typography, IconButton, useMediaQuery } from "@mui/material";
import React, { useContext, useState } from "react";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link, useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import axios from "axios";
import { SearchContext } from "../../SearchContext";

//this component will render single product card
const Product = (props) => {
  const primaryColor = "#2B2D42";
  const selectedColor = "#EF233C";
  const token = localStorage.getItem("Token");
  const { utilState, setUtilState } = useContext(SearchContext);
  const navigate = useNavigate();
  const {
    _id,
    name,
    imageThumbnailUrl,
    price,
    description,
    category,
    averageRating,
    totalRating,
    wishlisted,
  } = props.productData;

  const handleAddToWishlist = async () => {
    await axios.post(
      `${process.env.REACT_APP_BACKEND_SERVER}/wishlist/add`,
      {
        product: {
          productId: _id,
          name: name,
          imageThumbnailUrl: imageThumbnailUrl,
        },
      },
      {
        headers: { Authorization: token },
      }
    );
    setUtilState({ ...utilState, clicked: !utilState.clicked });
  };

  const deleteFromWishlist = async () => {
    await axios.post(
      `${process.env.REACT_APP_BACKEND_SERVER}/wishlist/delete`,
      {
        productId: _id,
      },
      {
        headers: { Authorization: token },
      }
    );
    setUtilState({ ...utilState, clicked: !utilState.clicked });
  };

  const handleProductClick = (e) => {
    e.preventDefault();
    navigate(`/product`, {
      state: {
        id: _id,
      },
    });
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        padding: "0rem 2rem 3rem 2rem",
        borderRadius: "10px",
        boxShadow: 6,
      }}
    >
      <Box
        sx={{
          display: "flex",
          paddingTop: "2rem",
          justifySelf: "center",
          alignSelf: "center",
          height: "13rem",
          width: "9rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LazyLoadImage
            onClick={handleProductClick}
            src={imageThumbnailUrl}
            width={"100%"}
            style={{ maxWidth: "100%", cursor: "pointer" }}
            height={"100%"}
            alt={name}
          />
        </Box>
      </Box>
      <Typography
        component={Link}
        onClick={handleProductClick}
        sx={{
          fontWeight: "bold",
          textDecoration: "none",
          color: primaryColor,
          "&:hover": { color: selectedColor },
        }}
      >
        {name.length < 80 ? name : name.substr(0, 80) + "..."}
      </Typography>
      <Box
        sx={{
          display: "flex",
          overflow: "hidden",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifySelf: "flex-start",
            width: "100%",

            alignItems: "center",
          }}
        >
          <Typography>{averageRating}</Typography>
          <Stack sx={{ paddingRight: "0.2rem" }} spacing={1}>
            <Rating
              name="half-rating-read"
              value={averageRating}
              precision={0.5}
              readOnly
              size="small"
            />
          </Stack>
          <Typography>({totalRating})</Typography>
        </Box>
        <Box sx={{ display: "flex", justifySelf: "flex-start" }}>
          <IconButton
            onClick={wishlisted ? deleteFromWishlist : handleAddToWishlist}
            aria-label="wishlist button"
            sx={{ width: "2px", paddingLeft: "1rem" }}
          >
            {wishlisted ? (
              <FavoriteIcon sx={{ fontSize: "1.6rem" }} />
            ) : (
              <FavoriteBorderIcon sx={{ fontSize: "1.6rem" }} />
            )}
          </IconButton>
        </Box>
      </Box>
      <Typography variant="h5" sx={{ fontWeight: "bold" }}>
        $ {price}
      </Typography>
    </Box>
  );
};

export default Product;
