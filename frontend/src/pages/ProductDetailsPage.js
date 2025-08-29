import axios from "axios";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { useLocation } from "react-router-dom";
import "../components/cart/ViewCart.css";
import ErrorPage from "../components/ErrorPage";
import Header from "../components/Header";
import ProductInfo from "../components/product/ProductInfo";
import { Ratings } from "../components/product/Ratings";

export default function ProductPageDetails() {
  const [product, setProduct] = useState("");
  const { state } = useLocation();
  const token = localStorage.getItem("Token");
  const id = state?.id;

  const fetchProductDetails = async () => {
    if (!id) return; // Guard clause inside function

    const tempProduct = await axios.get(
      `${process.env.REACT_APP_BACKEND_SERVER}/products/${id}`,
      {
        headers: { Authorization: token },
      }
    );
    setProduct(tempProduct.data);
  };

  useEffect(() => {
    fetchProductDetails();
  }, []);

  // Conditional rendering at the end
  if (!id) {
    return <ErrorPage />;
  }

  return (
    <div>
      {localStorage.getItem("Token") ? (
        <div>
          <Header />
          <Container className="margin-top">
            {product ? (
              <div>
                <ProductInfo product={product} />
                <Ratings product={product} />
              </div>
            ) : null}
          </Container>
        </div>
      ) : (
        <ErrorPage />
      )}
    </div>
  );
}
