import { Box } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { SearchContext } from "../../SearchContext";

//this component will sort the products list
const Sort = () => {
  const [initial, setInitial] = useState(true);
  const { utilState, setUtilState } = useContext(SearchContext);
  const WhiteBorderTextField = styled(Select)({
    "&.Mui-focused": {
      borderColor: "red",
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "red",
      },
    },
  });

  const handleChange = (e) => {
    setUtilState({ ...utilState, sortCategory: e.target.value, page: 1 });
  };

  return (
    <Box
      sx={{ display: "flex", justifyContent: "flex-end", paddingTop: "1rem" }}
    >
      <FormControl sx={{ m: 1, width: 200 }}>
        <InputLabel id="demo-simple-select-label">Sort by</InputLabel>
        <WhiteBorderTextField
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={utilState.sortCategory ? utilState.sortCategory : ""}
          label="Sort by"
          onChange={handleChange}
        >
          <MenuItem value={"priceLow"}>Price: Low to High</MenuItem>
          <MenuItem value={"priceHigh"}>Price: High to Low</MenuItem>
          <MenuItem value={"highestReview"}>Highest Reviews</MenuItem>
        </WhiteBorderTextField>
      </FormControl>
    </Box>
  );
};

export default Sort;
