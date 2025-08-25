import { React, SyntheticEvent, useContext, useState } from "react";
import Box from "@mui/material/Box";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Divider from "@mui/material/Divider";
import { categories } from "../jsonObject/categoryJson";
import { styled } from "@mui/material/styles";
import { IconButton } from "@mui/material";
import { SearchContext } from "../../SearchContext";

//this component is the category bar below header
const Category = () => {
  const primaryColor = "#2B2D42";
  const selectedColor = "#EF233C";
  const handle = () => {};
  const { utilState, setUtilState } = useContext(SearchContext);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setUtilState({
      ...utilState,
      category: categories[newValue].title,
      value: newValue,
    });
  };

  const StyledTabs = styled((props) => (
    <Tabs
      sx={{
        "& .MuiTabs-indicator": {
          backgroundColor:
            props.label === utilState.category ? primaryColor : selectedColor,
        },
      }}
      {...props}
      TabIndicatorProps={{
        children: <span className="MuiTabs-indicatorSpan" />,
      }}
    />
  ))({
    "& .MuiTabs-indicator": {
      display: "flex",
      justifyContent: "center",
    },
    "& .MuiTabs-indicatorSpan": {
      width: "100%",
    },
  });

  const StyledTab = styled((props) => (
    <Tab
      onChange={handleChange}
      sx={{
        "&.Mui-selected": {
          color:
            props.label === utilState.category ? selectedColor : primaryColor,
        },
      }}
      disableRipple
      {...props}
    />
  ))(({ theme }) => ({
    textTransform: "none",
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
  }));

  return (
    <Box>
      <Box
        sx={{
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <Box>
          <StyledTabs
            value={utilState.value ? utilState.value : 0}
            onChange={handleChange}
            scrollButtons
            aria-label="Category Items"
            variant="scrollable"
          >
            {categories.map((category) => {
              return (
                <StyledTab
                  key={category.id}
                  icon={<category.icon />}
                  label={category.title}
                />
              );
            })}
          </StyledTabs>
        </Box>
      </Box>
      <Divider sx={{ background: "black", borderBlockWidth: 1 }} />
    </Box>
  );
};

export default Category;
