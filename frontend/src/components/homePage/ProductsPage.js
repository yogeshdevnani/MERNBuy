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
  const [isLoading, setIsLoading] = useState(true); // Add this
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
    setIsLoading(true); // Start loading

    try {
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
    } finally {
      setIsLoading(false); // Stop loading
    }
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
      {isLoading ? (
        <Box sx={{ textAlign: "center", padding: "4rem" }}>
          <h2>Hang tight, awesome products are on their way! 🛍️</h2>
        </Box>
      ) : (
        <Box
          sx={{
            flexGrow: 1,
            paddingTop: { xs: '1rem', md: '3rem' },
            paddingLeft: { xs: '1rem', md: '3rem' },
            paddingRight: { xs: '1rem', md: '3rem' },
          }}
        >
          <Sort
            setProductsList={setProductsList}
            sortCategory={sortCategory}
            setSortCategory={setSortCategory}
            getProductsWithWishlisted={getProductsWithWishlisted}
            setTotalPages={setTotalPages}
          />
          {/* On mobile, display filters above products */}
          <Box sx={{ display: { xs: 'block', md: 'none' }, mb: 2 }}>
            <Filters
              setProductsList={setProductsList}
              sortCategory={sortCategory}
              getProductsWithWishlisted={getProductsWithWishlisted}
              setTotalPages={setTotalPages}
            />
          </Box>
          <Grid container spacing={4}>
            {/* On desktop, display filters in left column */}
            <Grid item md={3} sx={{ display: { xs: 'none', md: 'block' } }}>
              <Filters
                setProductsList={setProductsList}
                sortCategory={sortCategory}
                getProductsWithWishlisted={getProductsWithWishlisted}
                setTotalPages={setTotalPages}
              />
            </Grid>
            <Grid item xs={12} md={9}>
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
      )}
    </Box>
  );
};

export default ProductsPage;
