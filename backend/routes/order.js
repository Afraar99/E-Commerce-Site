const express = require("express");
const { createOrder } = require("../controllers/orderController");
const router = express.Router();

router.route("/order").get(createOrder);

module.exports = router;    