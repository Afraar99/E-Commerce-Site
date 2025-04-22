const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logout,
  getUserProfile,
  updateProfile,
} = require("../controllers/authController");
const { isAuthenticatedUser } = require("../middleware/auth");

// Auth routes
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logout);

// User profile routes
router.route("/profile").get(isAuthenticatedUser, getUserProfile);
router.route("/profile/update").put(isAuthenticatedUser, updateProfile);

module.exports = router;
