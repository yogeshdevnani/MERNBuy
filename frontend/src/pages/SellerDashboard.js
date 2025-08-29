/* 
Seller Dashboard to view the products at a glance. This is a seperate feature, and requires further work. 
Although the product management is working and in sync with other teammates modules.
*/
import React from "react";
import SellerNavbar from "../components/sellerDashboard/SellerNavbar";
import { Box, Button, Card } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "../components/sellerDashboard/sellerdashboard.css";
import ProductTable from "../components/productManagement/ProductTable";
import ErrorPage from "./ErrorPage";
import DashboardCard from "../components/sellerDashboard/DashboardCard";
import SellerCardsOverview from "../components/sellerDashboard/SellerCardsOverview";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

function SellerDashboard() {
  const navigate = useNavigate();
  const handleAddItemClick = () => {
    navigate("/additem");
  };

  const handleUpdateItemClick = () => {
    navigate("/updateitem");
  };
  return (
    <div>
      {localStorage.getItem("Token") ? (
        <div>
          <SellerNavbar />
          <div className="dashboard">
            <div id="updateInventory">
              <Button
                variant="contained"
                id="buttons"
                onClick={handleAddItemClick}
                size="large"
                sx={{
                  width: "20vw",
                }}
                startIcon={<AddBoxIcon />}
              >
                Add Item
              </Button>
              <Button
                variant="contained"
                id="buttons"
                onClick={handleUpdateItemClick}
                size="large"
                sx={{
                  width: "20vw",
                }}
                startIcon={<ModeEditIcon />}
              >
                <Link to="/updateitem" id="links">
                  {" "}
                  Update Item{" "}
                </Link>
              </Button>
            </div>
            <div>
              <SellerCardsOverview />
            </div>

            <ProductTable showEditButton="false" />
          </div>
        </div>
      ) : (
        <ErrorPage />
      )}
    </div>
  );
}

export default SellerDashboard;
