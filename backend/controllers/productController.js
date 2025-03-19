const productModel = require("../models/productModel");

//Get Products API - /api/v1/products
exports.getProducts = async (req, res, next) => {
  const products = await productModel.find({});

  res.json({
    success: true,
    products,
  });
};

//Get Single Product API - /api/v1/product/:id
exports.getSingleProduct = async (req, res, next) => {
  const product = await productModel.findById(req.params.id);
  res.json({
    success: true,
    message: "This route will show all single products in database",
  });
};
