const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: String,
  ratings: String,
  images: [
    {
      image: String,
    },
  ],
  category: String,
  seller: String,
  stock: String,
  numOfReviews: String,
  createdAt: Date,
});

const productModel = mongoose.model("Product", productSchema);

module.exports = productModel;
