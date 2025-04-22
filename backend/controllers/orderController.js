const orderModel = require("../models/orderModel");
const productModel = require("../models/productModel");

// Create Order - /api/v1/order
exports.createOrder = async (req, res, next) => {
  try {
    const cartItems = req.body.cartItems;
    const amount = Number(
      cartItems.reduce((acc, item) => acc + item.product.price * item.qty, 0)
    ).toFixed(2);
    const status = "Processing";

    // Add shipping address to order
    const { shippingAddress } = req.body;

    // Create order with user ID
    const order = await orderModel.create({
      cartItems,
      amount,
      status,
      user: req.user._id,
      shippingAddress,
    });

    // Update product stock
    cartItems.forEach(async (item) => {
      const product = await productModel.findById(item.product._id);
      product.stock = product.stock - item.qty;
      await product.save();
    });

    res.json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get logged in user orders - /api/v1/orders/me
exports.getMyOrders = async (req, res, next) => {
  try {
    const orders = await orderModel.find({ user: req.user._id });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get single order - /api/v1/order/:id
exports.getSingleOrder = async (req, res, next) => {
  try {
    const order = await orderModel.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "No Order found with this ID",
      });
    }

    // Check if the order belongs to logged in user or user is admin
    if (
      order.user.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(401).json({
        success: false,
        message: "You are not authorized to view this order",
      });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
