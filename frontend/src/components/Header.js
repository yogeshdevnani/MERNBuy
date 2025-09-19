import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Logo from "../images/logo.png";
import {
  TextField,
  IconButton,
  useMediaQuery,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import {
  AccountBalanceWalletOutlined,
  SearchOutlined,
  FavoriteBorderOutlined,
  ShoppingCartOutlined,
  LogoutOutlined,
  Menu as MenuIcon,
  AccountCircle,
  ShoppingBag,
} from "@mui/icons-material";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { SearchContext } from "../SearchContext";

//this component is as name suggests Header
const Header = () => {
  const primaryColor = "#2B2D42";
  const selectedColor = "#EF233C";
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const { utilState, setUtilState } = useContext(SearchContext);
  const cartItems = [];
  const totalCost = 0;
  const totalItems = 0;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const logout = () => {
    window.scrollTo(0, 0);
    if (window.confirm("Are you sure you want to log out?")) {
      localStorage.removeItem("Token");
      localStorage.removeItem("userType");
      navigate("/");
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = () => {
    setUtilState({ ...utilState, search: searchValue });
    navigate("/home");
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const handleWishlist = () => {
    navigate("/wishlist");
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const handleWallett = () => {
    navigate("/wallet");
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const handleViewCart = () => {
    navigate("/cart", {
      replace: false,
      state: {
        cartItems: cartItems,
        totalCost: totalCost,
        totalItems: totalItems,
      },
    });
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const handleNavigate = (path) => {
    navigate(path);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const drawer = (
    <Box sx={{ width: 250, p: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
        <Link to="/home" onClick={() => setMobileOpen(false)}>
          <img
            style={{ height: "8rem", width: "8rem" }}
            src={Logo}
            alt="logo"
          />
        </Link>
      </Box>

      <Box sx={{ mb: 2 }}>
        <TextField
          fullWidth
          sx={{
            "& .MuiInputBase-root": {
              "& input": {
                color: primaryColor,
              },
            },
            "& .MuiOutlinedInput-notchedOutline": {
              border: "1px solid #8098ab",
            },
          }}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={handleKeyDown}
          id="outlined-basic-mobile"
          label="Search"
          variant="outlined"
          size="small"
          aria-label="Type your product name"
        />
        <Button
          fullWidth
          variant="contained"
          sx={{
            mt: 1,
            background: primaryColor,
            "&:hover": {
              backgroundColor: selectedColor,
            },
          }}
          onClick={handleSearch}
          startIcon={<SearchOutlined />}
        >
          Search
        </Button>
      </Box>

      <List>
        <ListItem button onClick={() => handleNavigate("/orderdetails")}>
          <ListItemIcon>
            <ShoppingBag style={{ fill: primaryColor }} />
          </ListItemIcon>
          <ListItemText primary="Orders" />
        </ListItem>

        <ListItem button onClick={() => handleNavigate("/updatepassword")}>
          <ListItemIcon>
            <AccountCircle style={{ fill: primaryColor }} />
          </ListItemIcon>
          <ListItemText primary="Update Password" />
        </ListItem>

        <ListItem button onClick={() => handleNavigate("/account")}>
          <ListItemIcon>
            <AccountCircle style={{ fill: primaryColor }} />
          </ListItemIcon>
          <ListItemText primary="Account Details" />
        </ListItem>

        <ListItem button onClick={handleWishlist}>
          <ListItemIcon>
            <FavoriteBorderOutlined style={{ fill: primaryColor }} />
          </ListItemIcon>
          <ListItemText primary="Wishlist" />
        </ListItem>

        <ListItem button onClick={handleWallett}>
          <ListItemIcon>
            <AccountBalanceWalletOutlined style={{ fill: primaryColor }} />
          </ListItemIcon>
          <ListItemText primary="Wallet" />
        </ListItem>

        <ListItem button onClick={handleViewCart}>
          <ListItemIcon>
            <ShoppingCartOutlined style={{ fill: primaryColor }} />
          </ListItemIcon>
          <ListItemText primary="Cart" />
        </ListItem>

        <ListItem button onClick={logout}>
          <ListItemIcon>
            <LogoutOutlined style={{ fill: primaryColor }} />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box
      sx={{
        display: "flex",
        height: isMobile ? "auto" : "8vh",
        color: { primaryColor },
        flexDirection: isMobile ? "column" : "row",
      }}
    >
      {isMobile ? (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px 15px",
              borderBottom: "1px solid #eee",
            }}
          >
            <Link to="/home">
              <img
                style={{ height: "4rem", width: "4rem" }}
                src={Logo}
                alt="logo"
              />
            </Link>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Drawer
            variant="temporary"
            anchor="right"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile
            }}
          >
            {drawer}
          </Drawer>
        </>
      ) : (
        <>
          <Box sx={{ flex: 1.5 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "1rem",
                height: "100%",
              }}
            >
              <Link to="/home">
                <div>
                  <img
                    style={{ height: "15rem", width: "15rem" }}
                    src={Logo}
                    alt="logo"
                  />
                </div>
              </Link>
            </Box>
          </Box>
          <Box
            sx={{
              flex: 3,
            }}
          >
            <Box
              sx={{
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: { primaryColor },
              }}
            >
              <TextField
                sx={{
                  width: "90%",
                  "& .MuiInputBase-root": {
                    "& input": {
                      color: { primaryColor },
                    },
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "1px solid #8098ab",
                  },
                }}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={handleKeyDown}
                id="outlined-basic"
                label="search"
                variant="outlined"
                size="small"
                aria-label="Type your product name"
              />
              <IconButton
                type="button"
                onClick={handleSearch}
                aria-label="Start searching"
              >
                <SearchOutlined
                  style={{
                    fill: "#252525",
                    height: "2rem",
                    width: "2rem",
                  }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Box
              sx={{
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <PopupState variant="popover" popupId="demo-popup-menu">
                {(popupState) => (
                  <Box>
                    <Button
                      aria-label="Account settings"
                      sx={{
                        background: primaryColor,
                        textTransform: "none",
                        height: "2.5rem",
                        "&:hover": {
                          backgroundColor: selectedColor,
                        },
                      }}
                      variant="contained"
                      {...bindTrigger(popupState)}
                    >
                      Account
                    </Button>
                    <Menu {...bindMenu(popupState)}>
                      <MenuItem
                        aria-label="View your orders"
                        onClick={popupState.close}
                      >
                        <NavLink
                          to="/orderdetails"
                          style={{ textDecoration: "none" }}
                        >
                          Orders
                        </NavLink>
                      </MenuItem>
                      <MenuItem
                        aria-label="Update your password"
                        onClick={popupState.close}
                      >
                        <NavLink
                          to="/updatepassword"
                          style={{ textDecoration: "none" }}
                        >
                          Update Password
                        </NavLink>
                      </MenuItem>
                      <MenuItem
                        aria-label="Update your account details"
                        onClick={popupState.close}
                      >
                        <NavLink
                          to="/account"
                          style={{ textDecoration: "none" }}
                        >
                          Update Details
                        </NavLink>
                      </MenuItem>
                    </Menu>
                  </Box>
                )}
              </PopupState>
            </Box>
          </Box>
          <Box sx={{ flex: 2 }}>
            <Box
              sx={{
                height: "100%",
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                overflow: "hidden",
                color: { primaryColor },
              }}
            >
              <Box
                sx={{
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <IconButton
                  type="button"
                  aria-label="Wishlist"
                  sx={{
                    padding: "0",
                  }}
                  onClick={handleWishlist}
                >
                  <FavoriteBorderOutlined
                    style={{
                      fill: "#252525",
                      height: "2rem",
                      width: "2rem",
                    }}
                  />
                </IconButton>
                <p style={{ fontSize: "0.7rem", padding: "0", margin: "0" }}>
                  Wishlist
                </p>
              </Box>
              <Box
                sx={{
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <IconButton
                  type="button"
                  aria-label="Wallet"
                  onClick={handleWallett}
                  sx={{
                    padding: "0",
                  }}
                >
                  <AccountBalanceWalletOutlined
                    style={{
                      fill: "#252525",
                      height: "2rem",
                      width: "2rem",
                    }}
                  />
                </IconButton>
                <p style={{ fontSize: "0.7rem", padding: "0", margin: "0" }}>
                  Wallet
                </p>
              </Box>
              <Box
                sx={{
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <IconButton
                  type="button"
                  aria-label="View cart"
                  sx={{
                    padding: "0",
                  }}
                  onClick={handleViewCart}
                >
                  <ShoppingCartOutlined
                    style={{
                      fill: "#252525",
                      height: "2rem",
                      width: "2rem",
                    }}
                  />
                </IconButton>
                <p style={{ fontSize: "0.7rem", padding: "0", margin: "0" }}>
                  Cart
                </p>
              </Box>
              <Box
                sx={{
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <IconButton
                  type="button"
                  aria-label="Logout"
                  sx={{
                    padding: "0",
                  }}
                  onClick={logout}
                >
                  <LogoutOutlined
                    style={{
                      fill: "#252525",
                      height: "2rem",
                      width: "2rem",
                    }}
                  />
                </IconButton>
                <p style={{ fontSize: "0.7rem", padding: "0", margin: "0" }}>
                  Logout
                </p>
              </Box>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Header;
