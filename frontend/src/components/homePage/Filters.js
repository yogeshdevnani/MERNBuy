import { Box, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import Link from "@mui/material/Link";
import Rating from "@mui/material/Rating";
import axios from "axios";
import { SearchContext } from "../../SearchContext";
import {
  categories,
  priceListFilter,
  review,
} from "../jsonObject/categoryJson";

//this component is filter categories like department, price, ratings
const Filters = ({
  setProductsList,
  sortCategory,
  getProductsWithWishlisted,
}) => {
  const [initial, setInitial] = useState(true);
  const { utilState, setUtilState } = useContext(SearchContext);
  const token = localStorage.getItem("Token");
  const primaryColor = "#2B2D42";
  const selectedColor = "#EF233C";

  const setPrice = (item) => {
    if (item.title === "All") {
      setUtilState({
        ...utilState,
        search: "All",
        minPrice: "All",
        maxPrice: "All",
      });
    } else {
      setUtilState({
        ...utilState,
        minPrice: item.minValue,
        maxPrice: item.maxValue,
      });
    }
  };

  const handleSetCategory = (categoryItem) => {
    let tempCategory = categoryItem.title;
    if (tempCategory === "All") {
      setUtilState({ ...utilState, search: "All", category: "All", value: 0 });
    } else {
      setUtilState({
        ...utilState,
        category: tempCategory,
        value: categoryItem.id,
      });
    }
  };

  const handleSetRating = (item) => {
    let tempRating = item.id;
    if (tempRating === "All") {
      setUtilState({ ...utilState, search: "All", rating: "All" });
    } else {
      setUtilState({
        ...utilState,
        rating: tempRating,
      });
    }
  };

  const fetchFilteredProductsList = async () => {
    const products = await axios.post(
      `${process.env.REACT_APP_BACKEND_SERVER}/products/filter`,
      {
        category: utilState.category,
        minPrice: utilState.minPrice,
        maxPrice: utilState.maxPrice,
        rating: utilState.rating,
        sortCategory: utilState.sortCategory,
      },
      {
        headers: { Authorization: token },
      }
    );
    setUtilState({ ...utilState, totalPages: products.data.totalPages });
    const productsWithWishlisted = await getProductsWithWishlisted(products);
    setProductsList(productsWithWishlisted);
  };

  useEffect(() => {
    if (initial) {
      setInitial(false);
    } else {
      fetchFilteredProductsList();
    }
  }, [utilState.category, utilState.minPrice, utilState.rating]);

  return (
    <Box>
      <Typography
        variant="h6"
        sx={{ fontWeight: "bold", paddingBottom: "0.5rem" }}
        color="initial"
      >
        Filters
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          paddingBottom: "2rem",
        }}
      >
        <Typography
          variant="body"
          sx={{ fontWeight: "bold", paddingBottom: "0.5rem" }}
          color="initial"
        >
          Department
        </Typography>
        {categories.map((categoryItem) => {
          return (
            <Link
              key={categoryItem.id}
              onClick={() => handleSetCategory(categoryItem)}
              underline="hover"
              sx={{
                color:
                  categoryItem.title === utilState.category
                    ? selectedColor
                    : primaryColor,
                paddingBottom: "0.2rem",
                cursor: "pointer",
              }}
            >
              {categoryItem.title}
            </Link>
          );
        })}
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          paddingBottom: "2rem",
        }}
      >
        <Typography
          variant="body"
          sx={{ fontWeight: "bold", paddingBottom: "0.5rem" }}
          color="initial"
        >
          Price
        </Typography>
        {priceListFilter.map((price) => {
          return (
            <Link
              key={price.id}
              onClick={() => setPrice(price)}
              underline="hover"
              sx={{
                color:
                  price.maxValue === utilState.maxPrice
                    ? selectedColor
                    : primaryColor,
                paddingBottom: "0.2rem",
                cursor: "pointer",
              }}
            >
              {price.title}
            </Link>
          );
        })}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          paddingBottom: "4rem",
        }}
      >
        <Typography
          variant="body"
          sx={{ fontWeight: "bold", paddingBottom: "0.5rem" }}
          color="initial"
        >
          Reviews
        </Typography>

        {review.map((item) => {
          return (
            <Link
              key={item.id}
              onClick={() => handleSetRating(item)}
              underline="hover"
              sx={{
                color:
                  item.id === utilState.rating ? selectedColor : primaryColor,
                margin: "0",
                cursor: "pointer",
              }}
            >
              {item.title === "All" ? (
                <span
                  style={{
                    color:
                      item.id === utilState.rating
                        ? selectedColor
                        : primaryColor,
                  }}
                >
                  {item.title}
                </span>
              ) : (
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "0",
                    minHeight: "0",
                  }}
                >
                  <Rating
                    name="half-rating-read"
                    value={item.id}
                    precision={0.5}
                    readOnly
                  />
                  <Typography
                    variant="body"
                    sx={{
                      margin: "0",
                    }}
                    color={
                      item.id === utilState.rating
                        ? selectedColor
                        : primaryColor
                    }
                  >
                    &nbsp; & up
                  </Typography>
                </span>
              )}
            </Link>
          );
        })}
      </Box>
    </Box>
  );
};

export default Filters;
