const express = require("express");
const router = express.Router();
const {
  createOrder,
  getMyOrders,
  getSingleOrder,
} = require("../controllers/orderController");
const { isAuthenticatedUser } = require("../middleware/auth");

// Order routes
router.route("/order").post(isAuthenticatedUser, createOrder);
router.route("/orders/me").get(isAuthenticatedUser, getMyOrders);
router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);

module.exports = router;
