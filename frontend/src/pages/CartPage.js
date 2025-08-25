import React from "react";
import { ViewCart } from "../components/cart/ViewCart";
import ErrorPage from "../components/ErrorPage";
import Header from "../components/Header";

const CartPage = () => {
  return (
    <div>
      {localStorage.getItem("Token") ? (
        <div>
          <Header />
          <ViewCart />
        </div>
      ) : (
        <ErrorPage />
      )}
    </div>
  );
};

export default CartPage;
