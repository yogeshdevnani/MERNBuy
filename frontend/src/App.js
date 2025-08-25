import "./App.css";
import SellerDashboard from "./pages/SellerDashboard";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import Main from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ResetPage from "./pages/ResetPage";
import AccountPage from "./pages/AccountPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

function App() {
  const [utilState, setUtilState] = useState({});
  return (
    <BrowserRouter>
      <SearchContext.Provider value={{ utilState, setUtilState }}>
        <Routes>
          <Route index element={<Main />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/otp" element={<ResetPage />} />
          <Route path="/reset" element={<RestrictedResetPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/sellerdashboard" element={<SellerDashboard />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/product" element={<ProductPageDetails />} />
          <Route path="/updatepassword" element={<UpdatePasswordPage />} />
          <Route path="/orderdetails" element={<OrderDetails />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/wallet" element={<WalletPage />} />
          <Route path="/checkout/success" element={<Success />} />
          <Route path="/address" element={<AddressPage />} />
          <Route path="/additem" element={<ListItemForm preFilled="false" />} />
          <Route path="/updateitem" element={<UpdateItems />} />
          <Route path="/transaction" element={<TransactionPage />} />
          <Route
            path="/updateitemform"
            element={<ListItemForm preFilled="true" />}
          />

          <Route path="/" element={<Main />} />
        </Routes>
      </SearchContext.Provider>
    </BrowserRouter>
  );
}

export default App;
