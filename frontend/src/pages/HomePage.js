import { Box } from "@mui/material";
import React, { useEffect } from "react";
import Divider from "@mui/material/Divider";
import Category from "../components/homePage/Category";
import ProductsPage from "../components/homePage/ProductsPage";
import Header from "../components/Header";
import ErrorPage from "../components/ErrorPage";

//this component will render whole homepage along with header, products, etc.
const HomePage = () => {
  useEffect(() => {
    // Wake up backend silently using test endpoint
    fetch(process.env.REACT_APP_BACKEND_SERVER + "/test/testroute").catch(
      () => {}
    ); // Silent - don't show errors to user
  }, []);

  return (
    <Box>
      {localStorage.getItem("Token") ? (
        <Box>
          <Header />
          <Divider />
          <Category />
          <ProductsPage />
        </Box>
      ) : (
        <ErrorPage />
      )}
    </Box>
  );
};

export default HomePage;
