const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  cartItems: Array,
  amount: String,
  status: {
    type: String,
    default: "Processing",
  },
  paymentMethod: {
    type: String,
    default: "Card Payment",
  },
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const orderModel = mongoose.model("Order", orderSchema);

module.exports = orderModel;
