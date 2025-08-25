import React from "react";
import Address from "../components/paymentGateway/Address";

function AddressPage() {
  return (
    <div>
      {localStorage.getItem("Token") ? (
        <div>
          <Address />
        </div>
      ) : (
        <Address />
      )}
    </div>
  );
}

export default AddressPage;
