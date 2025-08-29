import React from "react";
import Wallet from "../components/wallet/Wallet";
import ErrorPage from "./ErrorPage";

function CheckoutPage() {
  return (
    <div>
      {localStorage.getItem("Token") ? (
        <div>
          <Wallet />
        </div>
      ) : (
        <Wallet />
      )}
    </div>
  );
}

export default CheckoutPage;
