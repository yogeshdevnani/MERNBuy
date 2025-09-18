import "./App.css";
import SellerDashboard from "./pages/SellerDashboard";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import Main from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ResetPage from "./pages/ResetPage";
import AccountPage from "./pages/AccountPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import UpdatePasswordPage from "./pages/UpdatePasswordPage";
import OrderDetails from "./components/Account/OrderDetails";
import ListItemForm from "./components/productManagement/ListItemForm";
import UpdateItems from "./components/productManagement/UpdateItems";
import ProductPageDetails from "./pages/ProductDetailsPage";
import CheckoutPage from "./pages/CheckoutPage";
import Success from "./components/paymentGateway/Success";
import WalletPage from "./pages/WalletPage";
import WishlistPage from "./pages/WishlistPage";
import { SearchContext } from "./SearchContext";
import { useState } from "react";
import RestrictedResetPage from "./pages/RestrictedResetPage";
import AddressPage from "./pages/AddressPage";
import TransactionPage from "./pages/TransactionPage";
import ErrorPage from "./pages/ErrorPage";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthenticatedRoute from "./components/AuthenticatedRoute";

function App() {
  const [utilState, setUtilState] = useState({});
  return (
    <BrowserRouter>
      <SearchContext.Provider value={{ utilState, setUtilState }}>
        <Box
          sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
        >
          <Box sx={{ flex: 1 }}>
            <Routes>
              <Route index element={<Main />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/otp" element={<ResetPage />} />
              <Route path="/reset" element={<RestrictedResetPage />} />
              <Route 
                path="/account" 
                element={
                  <AuthenticatedRoute>
                    <AccountPage />
                  </AuthenticatedRoute>
                } 
              />

              {/* Buyer-only routes */}
              <Route
                path="/home"
                element={
                  <ProtectedRoute allowedRoles={["Buyer"]}>
                    <HomePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/wishlist"
                element={
                  <ProtectedRoute allowedRoles={["Buyer"]}>
                    <WishlistPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/cart"
                element={
                  <ProtectedRoute allowedRoles={["Buyer"]}>
                    <CartPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/checkout"
                element={
                  <ProtectedRoute allowedRoles={["Buyer"]}>
                    <CheckoutPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/checkout/success"
                element={
                  <ProtectedRoute allowedRoles={["Buyer"]}>
                    <Success />
                  </ProtectedRoute>
                }
              />

              {/* Seller-only routes */}
              <Route
                path="/sellerdashboard"
                element={
                  <ProtectedRoute allowedRoles={["Seller"]}>
                    <SellerDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/additem"
                element={
                  <ProtectedRoute allowedRoles={["Seller"]}>
                    <ListItemForm preFilled="false" />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/updateitem"
                element={
                  <ProtectedRoute allowedRoles={["Seller"]}>
                    <UpdateItems />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/updateitemform"
                element={
                  <ProtectedRoute allowedRoles={["Seller"]}>
                    <ListItemForm preFilled="true" />
                  </ProtectedRoute>
                }
              />

              {/* Shared routes for both user types */}
              <Route 
                path="/product" 
                element={
                  <AuthenticatedRoute>
                    <ProductPageDetails />
                  </AuthenticatedRoute>
                } 
              />
              <Route 
                path="/updatepassword" 
                element={
                  <AuthenticatedRoute>
                    <UpdatePasswordPage />
                  </AuthenticatedRoute>
                } 
              />
              <Route 
                path="/orderdetails" 
                element={
                  <AuthenticatedRoute>
                    <OrderDetails />
                  </AuthenticatedRoute>
                } 
              />
              <Route 
                path="/wallet" 
                element={
                  <AuthenticatedRoute>
                    <WalletPage />
                  </AuthenticatedRoute>
                } 
              />
              <Route 
                path="/address" 
                element={
                  <AuthenticatedRoute>
                    <AddressPage />
                  </AuthenticatedRoute>
                } 
              />
              <Route 
                path="/transaction" 
                element={
                  <AuthenticatedRoute>
                    <TransactionPage />
                  </AuthenticatedRoute>
                } 
              />
              <Route path="/" element={<Main />} />

              {/* Catch-all route for 404 - MUST be last */}
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </Box>
          <Footer />
        </Box>
      </SearchContext.Provider>
    </BrowserRouter>
  );
}

export default App;
