/* 
This is the list item form that is used by seller.
It is reused to update as well
*/
import React, { useEffect } from "react";
import { Button, MenuItem, Select, TextField } from "@mui/material";
import "./listItemsForm.css";
import Box from "@mui/material/Box";
import { Container } from "@mui/system";
import { useState } from "react";
import UploadProductImage from "./UploadProductImage";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import SellerNavbar from "../sellerDashboard/SellerNavbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { categories } from "../jsonObject/categoryJson";

const ListItemForm = (props) => {
  const { state } = useLocation();

  const navigate = useNavigate();

  const [price, setPrice] = useState();
  const [priceError, setPriceError] = useState();
  const [priceErrorMessage, setPriceErrorMessage] = useState("");

  const [quantity, setQuantity] = useState();
  const [quantityError, setQuantityError] = useState();
  const [quantityErrorMessage, setQuantityErrorMessage] = useState("");

  const [productName, setProductName] = useState("");
  const [productNameError, setProductNameError] = useState();
  const productNameErrorMessage = "Please give product a name";

  const [description, setdescription] = useState("");
  const [selectedCategory, setselectedCategory] = useState("Electronics");

  const [validForm, setValidForm] = useState(false);

  const [preFilled, setPreFilled] = useState(false);

  const [imageURLSProduct, setimageURLSProduct] = useState([]);
  const modifiedCategories = categories;
  modifiedCategories[0]["title"] = "Other";

  useEffect(() => {
    if (props.preFilled == "false") {
      return;
    } else {
      const token = localStorage.getItem("Token");
      const headers = {
        Authorization: token,
      };
      const data = {
        productId: state.productId,
      };
      axios
        .post(
          process.env.REACT_APP_BACKEND_SERVER +
            "/productmanagement/getproductform",
          data
        )
        .then((response) => {
          const data = response["data"][0];
          fillForm(data);
        })
        .catch((response) => {
          console.log(`Error getProducts ${response}`);
        });
    }
  }, []);

  const getDataFromPictures = async (dataFromPictures) => {
    setimageURLSProduct(await generateImageURLS(dataFromPictures));
  };

  async function generateImageURLS(imageRawData) {
    const cloudName = "dihkowyae";
    const cloudinaryURL = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
    const formData = new FormData();
    const imageURLS = [];
    for (let i = 0; i < imageRawData.length; i++) {
      formData.append("file", imageRawData[i]);
      formData.append("upload_preset", "canadabuys813a");
      formData.append("cloud_name", "dihkowyae");

      fetch(cloudinaryURL, {
        method: "post",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          imageURLS.push(data["url"]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    return imageURLS;
  }

  function fillForm(data) {
    setProductName(data["name"]);
    setPrice(data["price"]);
    setQuantity(data["quantity"]);
    setselectedCategory(data["category"]);
    setdescription(data["description"]);
  }

  const fullSubmit = async () => {
    if (isNaN(Number.parseFloat(price))) {
      setPriceError(true);
      setPriceErrorMessage("Enter a numeric value");
      setValidForm(false);
    } else if (Number.parseFloat(price) < 0) {
      setPriceError(true);
      setPriceErrorMessage("Value should be greater than 0.");
      setValidForm(false);
    } else {
      setPriceError(false);
      setValidForm(true);

      if (isNaN(quantity)) {
        setQuantityError(true);
        setQuantityErrorMessage("Enter a numeric value for quantity.");
        setValidForm(false);
      } else if (Number.parseInt(quantity) < 0) {
        setQuantityError(true);
        setQuantityErrorMessage("Enter quantity more than 0.");
        setValidForm(false);
      } else {
        setQuantityError(false);
        if (productName.length <= 0) {
          setProductNameError(true);
          setValidForm(false);
        } else {
          setProductNameError(false);
          const listItemData = {
            productName: productName,
            price: price,
            quantity: quantity,
            description: description,
            category: selectedCategory,
            imageData: imageURLSProduct,
          };
          const token = localStorage.getItem("Token");
          const headers = {
            Authorization: token,
          };
          if (props.preFilled == "true") {
            // update item
            listItemData["currentProductId"] = state.productId;
          }
          axios
            .post(
              process.env.REACT_APP_BACKEND_SERVER +
                "/productmanagement/addproduct",
              listItemData,
              { headers: headers }
            )
            .then((response) => {
              navigate("/sellerdashboard");
            })
            .catch((response) => {
              console.log("response addproduct error" + response);
            });
          // navigate("/sellerdashboard");

          // imageUpload
          alert("Success");
        }
      }
    }
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleProductName = (event) => {
    setProductName(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setselectedCategory(event.target.value);
  };

  const handleAdditionalInformationChange = (event) => {
    setdescription(event.target.value);
  };

  return (
    <>
      <SellerNavbar />
      <Box className="listItemsForm">
        <Container id="addNewItemStyle">
          <form>
            <h3 style={{ color: "#454545" }}>
              Let's put your item on our e-store
            </h3>
            <div>
              <TextField
                placeholder="Enter the name product"
                label="Product's name"
                margin="normal"
                fullWidth
                required
                value={productName}
                error={productNameError}
                helperText={productNameError ? productNameErrorMessage : ""}
                onChange={handleProductName}
              />
            </div>
            <div>
              <TextField
                placeholder="$0.00"
                label="Price"
                margin="normal"
                fullWidth
                error={priceError}
                value={price}
                type="number"
                // inputProps={{ inputMode: "numeric" }}
                helperText={priceError ? priceErrorMessage : ""}
                required
                onChange={handlePriceChange}
              />
            </div>
            <div>
              <TextField
                placeholder="0"
                label="Quantity"
                margin="normal"
                fullWidth
                required
                type="number"
                error={quantityError}
                helperText={quantityError ? quantityErrorMessage : ""}
                onChange={handleQuantityChange}
                value={quantity}
              />
            </div>

            <div>
              <Select
                label="Categories"
                fullWidth
                helperText="Please select the category of your product"
                margin="normal"
                value={selectedCategory}
                required
                onChange={handleCategoryChange}
              >
                {modifiedCategories.map((item) => {
                  return (
                    <MenuItem key={item["title"]} value={item["title"]}>
                      {item["title"]}
                    </MenuItem>
                  );
                })}
              </Select>
            </div>

            <div>
              <TextField
                label="Additional information"
                multiline
                rows={5}
                style={{ width: "100%" }}
                placeholder="Input any message that you want to be displayed with the product."
                // fullWidth
                margin="normal"
                onChange={handleAdditionalInformationChange}
                value={description}
              />
            </div>

            <div>
              <Button variant="contained" onClick={fullSubmit} id="buttons">
                Submit
              </Button>
            </div>
          </form>
        </Container>
        {props.preFilled == "true" ? (
          <></>
        ) : (
          <Box id="UploadImageTagListItem">
            <h3>Image Section</h3>
            <UploadProductImage getDataFromPictures={getDataFromPictures} />
          </Box>
        )}
      </Box>
    </>
  );
};

export default ListItemForm;
