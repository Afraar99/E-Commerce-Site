const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
    maxLength: [50, "Your name cannot exceed 50 characters"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid email address",
    ],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minLength: [6, "Your password must be at least 6 characters long"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      default: "default_avatar",
    },
    url: {
      type: String,
      default: "/images/default_avatar.jpg",
    },
  },
  role: {
    type: String,
    default: "user",
  },
  address: {
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

// Encrypt password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// Compare user password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Return JWT token
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });
};

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
