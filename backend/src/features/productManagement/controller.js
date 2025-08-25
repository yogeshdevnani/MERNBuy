/* 
This is the controller for seller's product management
*/
const ProductManagementObj = require("./model");
const ProductManagementDbObj = require("./model");
const OrderObj = require("../payment/Order");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

exports.addProduct = async (req, res) => {
  try {
    const sellerId = req.user.id;
    const data = req.body;
    const imageURLSObject = generateImageURLObject(data.imageData);
    const noImageAvailableURL =
      "http://res.cloudinary.com/dihkowyae/image/upload/v1680702363/vjhv6fbbcoxzmqgmftrv.jpg";
    if (data.currentProductId) {
      const productId = data.currentProductId;

      const updateFields = {
        quantity: data.quantity,
        name: data.productName,
        price: data.price,
        sellerId: sellerId,
        description: data.description,
        category: data.category,
      };

      const updateForm = await ProductManagementObj.findByIdAndUpdate(
        productId,
        updateFields,
        { new: true }
      );
      res.send("success");
    } else {
      const productAdd = await ProductManagementDbObj.create({
        productId:
          Math.floor(Math.random() * 1000) +
          Math.floor(Math.random() * 1000) +
          1,
        quantity: data.quantity,
        name: data.productName,
        price: data.price,
        sellerId: sellerId,
        description: data.description ? data.description : "-",
        category: data.category,
        averageRating: 0,
        totalRating: 0,
        imageThumbnailUrl: data.imageData[0]
          ? data.imageData[0]
          : noImageAvailableURL,
        images: imageURLSObject,
        ratingsData: [
          {
            ratingId: 1, // This will generate a unique ID for each product
            ratingDesc: {
              ratings: [],
            },
          },
        ],
      });
      res.send("success");
    }
  } catch (error) {
    console.log(error);
  }
};

exports.getProductsBySellerId = async (req, res) => {
  try {
    const sellerId = req.user.id;
    const sellerProducts = await ProductManagementDbObj.find({
      sellerId: sellerId,
    });
    res.json(sellerProducts);
  } catch (error) {
    console.log(error);
  }
};

exports.getProductForm = async (req, res) => {
  try {
    const productId = req.body.productId;
    const productFormDetails = await ProductManagementObj.find({
      _id: productId,
    });
    res.json(productFormDetails);
  } catch (error) {
    console.log(error);
  }
};

exports.getSellerOverview = async (req, res) => {
  try {
    const sellerId = req.user.id;
    const sellerProducts = await ProductManagementDbObj.find({
      sellerId: sellerId,
    });
    const numberOfLowProducts = productsRunningLow(sellerProducts);
    const sellerOveview = {};
    sellerOveview["numberOfProducts"] = sellerProducts.length;
    sellerOveview["numberOfLowProducts"] = numberOfLowProducts;
    sellerOveview["averageRating"] = averageRating(sellerProducts);
    sellerOveview["totalBusinessAmount"] = await getSellerTotalAmountSold(
      sellerProducts
    );
    res.send(sellerOveview);
  } catch (error) {
    console.log(error);
  }
};

const productsRunningLow = (productsData) => {
  let lowProducts = 0;
  for (let i = 0; i < productsData.length; i++) {
    if (productsData[i]["quantity"] < 4) {
      lowProducts += 1;
    }
  }
  return lowProducts;
};

const averageRating = (productsData) => {
  try {
    let rating = 0;
    let totalProductsToCount = 0;
    for (let i = 0; i < productsData.length; i++) {
      if (productsData[i]["averageRating"] > 0) {
        rating += productsData[i]["averageRating"];
        totalProductsToCount += 1;
      }
    }
    if (totalProductsToCount == 0) {
      return 0;
    }
    return rating / totalProductsToCount;
  } catch (error) {
    console.log(error);
    return 0;
  }
};

const getSellerTotalAmountSold = async (productsData) => {
  try {
    // const allOrders = await OrderObj.find({});
    const productIdSpecificSeller = [];
    let totalBusinessAmount = 0;
    let ordersForSeller = [];
    for (let i = 0; i < productsData.length; i++) {
      let productId = productsData[i]["_id"].toString();
      productIdSpecificSeller.push(productId);
    }
    ordersForSeller = await OrderObj.find({
      productid: {
        $in: productIdSpecificSeller,
      },
    });
    for (let i = 0; i < ordersForSeller.length; i++) {
      totalBusinessAmount += ordersForSeller[i]["amount"];
    }
    return totalBusinessAmount;
  } catch (error) {
    console.log(error);
    return 0;
  }
};

exports.testDummy = async (req, res) => {
  res.send("Dummy called");
  console.log("dummy get called");
};

function generateImageURLObject(imageURLS) {
  const imageURLJson = [];
  for (let i = 0; i < imageURLS.length; i++) {
    imageURLJson.push({
      imageId: i + 1,
      imageUrl: imageURLS[i],
    });
  }

  return imageURLJson;
}
