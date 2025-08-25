const express = require("express");
const router = express.Router();
const authenticateUser = require("../../utils/authenticateUser");

const productManagementController = require("./controller");

router.post(
  "/addproduct",
  authenticateUser,
  productManagementController.addProduct
);

router.get(
  "/getsellerproducts",
  authenticateUser,
  productManagementController.getProductsBySellerId
);

router.post("/getproductform", productManagementController.getProductForm);

router.get("/test", productManagementController.testDummy);

router.get(
  "/getselleroverview",
  authenticateUser,
  productManagementController.getSellerOverview
);

module.exports = router;
