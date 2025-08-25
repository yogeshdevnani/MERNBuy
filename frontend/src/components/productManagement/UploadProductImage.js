/* 
This handles the image input from the seller for listing items.
*/
import { Button, ImageList } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import ImagesGrid from "./ImagesGrid";

const UploadProductImage = ({ getDataFromPictures }) => {
  // useState array images
  const [images, setImages] = useState([]);
  const [imageSingle, setimageSingle] = useState("");
  const urls = [];
  const cloudName = "dihkowyae";
  const cloudinaryURL = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;

  const handleImageChange = (e) => {
    setImages(e.target.files);
    getDataFromPictures(e.target.files);
  };

  return (
    <div>
      {images.length > 0 ? <ImagesGrid images={images} /> : <></>}
      {/* add multiple files as input */}
      <input onChange={handleImageChange} multiple type="file" />
    </div>
  );
};

export default UploadProductImage;
