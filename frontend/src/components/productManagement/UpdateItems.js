import React from "react";
import ProductTable from "./ProductTable";
import "./listItemsForm.css";
import SellerNavbar from "../sellerDashboard/SellerNavbar";

const UpdateItems = () =>{
    return (
        <div>
            <SellerNavbar/>
        <div id="updateItemsPage">
          <ProductTable />
        </div>
        </div>
      );
};

export default UpdateItems;