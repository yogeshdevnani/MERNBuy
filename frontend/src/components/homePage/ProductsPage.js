import { Box, Grid, Pagination } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import Filters from "./Filters";
import ProductsList from "./ProductsList";
import axios from "axios";
import Sort from "./Sort";
import { SearchContext } from "../../SearchContext";

//this component will fetch the productlist and manage
const ProductsPage = () => {
  const [productsList, setProductsList] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const token = localStorage.getItem("Token");
  const primaryColor = "#2B2D42";
  const selectedColor = "#EF233C";

  const handlePageChange = (event, value) => {
    setUtilState({ ...utilState, page: value });
  };

  const [sortCategory, setSortCategory] = React.useState("");
  const { utilState, setUtilState } = useContext(SearchContext);

  const getProductsWithWishlisted = async (products) => {
    const tempWishlist = await axios.get(
      `${process.env.REACT_APP_BACKEND_SERVER}/wishlist`,
      {
        headers: { Authorization: token },
      }
    );
    if (tempWishlist.data.length > 0) {
      const wishlistIds = tempWishlist.data[0].products.map(
        (product) => product.productId
      );
      const result = products.data.products.map((item) => ({
        ...item,
        wishlisted: wishlistIds.includes(item._id) ? true : false,
      }));
      return result;
    } else {
      return products.data.products;
    }
  };

  const fetchSearchedProductsList = async () => {
    const products = await axios.post(
      `${process.env.REACT_APP_BACKEND_SERVER}/products/filter?page=${utilState.page}`,
      utilState,
      {
        headers: { Authorization: token },
      }
    );
    setUtilState({
      ...utilState,
      totalPages: products.data.totalPages,
      clicked: true,
    });
    const productsWithWishlisted = await getProductsWithWishlisted(products);
    setProductsList(productsWithWishlisted);
  };

  useEffect(() => {
    fetchSearchedProductsList();
  }, [
    utilState.search,
    utilState.page,
    utilState.sortCategory,
    utilState.clicked,
  ]);
  return (
    <Box>
      <Box
        sx={{
          flexGrow: 1,
          paddingTop: "3rem",
          paddingLeft: "3rem",
          paddingRight: "3rem",
        }}
      >
        <Sort
          setProductsList={setProductsList}
          sortCategory={sortCategory}
          setSortCategory={setSortCategory}
          getProductsWithWishlisted={getProductsWithWishlisted}
          setTotalPages={setTotalPages}
        />
        <Grid container spacing={4}>
          <Grid item xs={6} md={3}>
            <Filters
              setProductsList={setProductsList}
              sortCategory={sortCategory}
              getProductsWithWishlisted={getProductsWithWishlisted}
              setTotalPages={setTotalPages}
            />
          </Grid>
          <Grid item xs={6} md={9}>
            <ProductsList productsList={productsList} />
            <Pagination
              sx={{ padding: "2rem" }}
              count={utilState.totalPages}
              page={utilState.page ? utilState.page : 1}
              onChange={handlePageChange}
              variant="outlined"
              shape="rounded"
            />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ height: "10vh", background: selectedColor }}></Box>
    </Box>
  );
};

export default ProductsPage;
