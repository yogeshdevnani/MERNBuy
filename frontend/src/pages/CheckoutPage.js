import React from "react";
import Payment from "../components/paymentGateway/Payment";
import ErrorPage from "./ErrorPage";

function CheckoutPage() {
  return (
    <div>
      {localStorage.getItem("Token") ? (
        <div>
          <Payment />
        </div>
      ) : (
        <ErrorPage />
      )}
    </div>
  );
}

export default CheckoutPage;
