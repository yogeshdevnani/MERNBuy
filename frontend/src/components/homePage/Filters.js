import { Box, Typography, Collapse, IconButton, useMediaQuery, useTheme, Drawer, Divider, Button } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import Link from "@mui/material/Link";
import Rating from "@mui/material/Rating";
import axios from "axios";
import { SearchContext } from "../../SearchContext";
import FilterListIcon from '@mui/icons-material/FilterList';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import {
  categories,
  priceListFilter,
  review,
} from "../jsonObject/categoryJson";

//this component is filter categories like department, price, ratings
const Filters = ({
  setProductsList,
  sortCategory,
  getProductsWithWishlisted,
}) => {
  const [initial, setInitial] = useState(true);
  const { utilState, setUtilState } = useContext(SearchContext);
  const token = localStorage.getItem("Token");
  const primaryColor = "#2B2D42";
  const selectedColor = "#EF233C";
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [expanded, setExpanded] = useState(!isMobile); // Expanded by default on desktop
  const [drawerOpen, setDrawerOpen] = useState(false); // For horizontal drawer

  const toggleExpanded = () => {
    if (isMobile) {
      setDrawerOpen(!drawerOpen);
    } else {
      setExpanded(!expanded);
    }
  };

  const setPrice = (item) => {
    if (item.title === "All") {
      setUtilState({
        ...utilState,
        search: "All",
        minPrice: "All",
        maxPrice: "All",
      });
    } else {
      setUtilState({
        ...utilState,
        minPrice: item.minValue,
        maxPrice: item.maxValue,
      });
    }
  };

  const handleSetCategory = (categoryItem) => {
    let tempCategory = categoryItem.title;
    if (tempCategory === "All") {
      setUtilState({ ...utilState, search: "All", category: "All", value: 0 });
    } else {
      setUtilState({
        ...utilState,
        category: tempCategory,
        value: categoryItem.id,
      });
    }
  };

  const handleSetRating = (item) => {
    let tempRating = item.id;
    if (tempRating === "All") {
      setUtilState({ ...utilState, search: "All", rating: "All" });
    } else {
      setUtilState({
        ...utilState,
        rating: tempRating,
      });
    }
  };

  const fetchFilteredProductsList = async () => {
    const products = await axios.post(
      `${process.env.REACT_APP_BACKEND_SERVER}/products/filter`,
      {
        category: utilState.category,
        minPrice: utilState.minPrice,
        maxPrice: utilState.maxPrice,
        rating: utilState.rating,
        sortCategory: utilState.sortCategory,
      },
      {
        headers: { Authorization: token },
      }
    );
    setUtilState({ ...utilState, totalPages: products.data.totalPages });
    const productsWithWishlisted = await getProductsWithWishlisted(products);
    setProductsList(productsWithWishlisted);
  };

  useEffect(() => {
    if (initial) {
      setInitial(false);
    } else {
      fetchFilteredProductsList();
    }
  }, [utilState.category, utilState.minPrice, utilState.rating]);

  // Use useEffect to update expanded state when screen size changes
  useEffect(() => {
    setExpanded(!isMobile);
  }, [isMobile]);

  // Filter content - used both in drawer and collapsed view
  const filterContent = (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          paddingBottom: "2rem",
        }}
      >
        <Typography
          variant="body"
          sx={{ fontWeight: "bold", paddingBottom: "0.5rem" }}
          color="initial"
        >
          Department
        </Typography>
        {categories.map((categoryItem) => {
          return (
            <Link
              key={categoryItem.id}
              onClick={() => handleSetCategory(categoryItem)}
              underline="hover"
              sx={{
                color:
                  categoryItem.title === utilState.category
                    ? selectedColor
                    : primaryColor,
                paddingBottom: "0.2rem",
                cursor: "pointer",
              }}
            >
              {categoryItem.title}
            </Link>
          );
        })}
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          paddingBottom: "2rem",
        }}
      >
        <Typography
          variant="body"
          sx={{ fontWeight: "bold", paddingBottom: "0.5rem" }}
          color="initial"
        >
          Price
        </Typography>
        {priceListFilter.map((price) => {
          return (
            <Link
              key={price.id}
              onClick={() => setPrice(price)}
              underline="hover"
              sx={{
                color:
                  price.maxValue === utilState.maxPrice
                    ? selectedColor
                    : primaryColor,
                paddingBottom: "0.2rem",
                cursor: "pointer",
              }}
            >
              {price.title}
            </Link>
          );
        })}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          paddingBottom: "4rem",
        }}
      >
        <Typography
          variant="body"
          sx={{ fontWeight: "bold", paddingBottom: "0.5rem" }}
          color="initial"
        >
          Reviews
        </Typography>

        {review.map((item) => {
          return (
            <Link
              key={item.id}
              onClick={() => handleSetRating(item)}
              underline="hover"
              sx={{
                color:
                  item.id === utilState.rating ? selectedColor : primaryColor,
                margin: "0",
                cursor: "pointer",
              }}
            >
              {item.title === "All" ? (
                <span
                  style={{
                    color:
                      item.id === utilState.rating
                        ? selectedColor
                        : primaryColor,
                  }}
                >
                  {item.title}
                </span>
              ) : (
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "0",
                    minHeight: "0",
                  }}
                >
                  <Rating
                    name="half-rating-read"
                    value={item.id}
                    precision={0.5}
                    readOnly
                  />
                  <Typography
                    variant="body"
                    sx={{
                      margin: "0",
                    }}
                    color={
                      item.id === utilState.rating
                        ? selectedColor
                        : primaryColor
                    }
                  >
                    &nbsp; & up
                  </Typography>
                </span>
              )}
            </Link>
          );
        })}
      </Box>
    </>
  );

  // For mobile, use a horizontal drawer
  if (isMobile) {
    return (
      <Box sx={{ 
        border: '1px solid #eee',
        borderRadius: '8px',
        padding: '10px',
        marginBottom: '20px'
      }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <FilterListIcon sx={{ mr: 1, color: primaryColor }} />
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold" }}
              color="initial"
            >
              Filters
            </Typography>
          </Box>
          <Button 
            onClick={toggleExpanded}
            startIcon={<FilterListIcon />}
            variant="outlined"
            size="small"
            sx={{ 
              color: primaryColor, 
              borderColor: primaryColor,
              '&:hover': {
                borderColor: selectedColor,
                color: selectedColor
              }
            }}
          >
            Show Filters
          </Button>
        </Box>

        {/* Horizontal Drawer for Mobile */}
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          sx={{
            '& .MuiDrawer-paper': {
              width: '80%',
              maxWidth: '300px',
              padding: '16px',
              boxSizing: 'border-box',
            },
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Filters
            </Typography>
            <IconButton onClick={() => setDrawerOpen(false)}>
              <ChevronRightIcon />
            </IconButton>
          </Box>
          <Divider sx={{ mb: 2 }} />
          {filterContent}
        </Drawer>
      </Box>
    );
  }

  // For desktop, use collapsible section
  return (
    <Box>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 2
      }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold" }}
          color="initial"
        >
          Filters
        </Typography>
        <IconButton 
          onClick={toggleExpanded} 
          aria-label={expanded ? "Collapse filters" : "Expand filters"}
          sx={{ color: primaryColor }}
        >
          {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>
      
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        {filterContent}
      </Collapse>
    </Box>
  );
};

export default Filters;