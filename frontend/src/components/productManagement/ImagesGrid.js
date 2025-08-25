import "./listItemsForm.css";
import React from "react";
import { Box } from "@mui/system";

const ImagesGrid = ({ images }) => {
  const mainImage = images[0];
  //   const additionalImage = images.slice(1);
  const imagesArray = Object.values(images);
  let imagesSmall = imagesArray.slice(1);
  console.log(imagesSmall);

  return (
    <Box className="ImageGridFull">
      <Box className="ImageGridMainImage">
        <img
          src={images[0] ? URL.createObjectURL(imagesArray[0]) : null}
          width={600}
        />
      </Box>
      <Box className="ImagesGrid">
        {Array.from(imagesSmall).map((image) => {
          return <img src={image ? URL.createObjectURL(image) : null} />;
        })}
      </Box>
    </Box>
  );
};

export default ImagesGrid;
