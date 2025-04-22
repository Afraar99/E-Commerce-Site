const express = require("express");
const app = express();
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDatabase = require("./config/connectDatabase");
dotenv.config({ path: path.join(__dirname, "config", "config.env") });

const products = require("./routes/product");
const orders = require("./routes/order");
const auth = require("./routes/auth");

connectDatabase();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

// API Routes
app.use("/api/v1/", products);
app.use("/api/v1/", orders);
app.use("/api/v1/", auth);

app.listen(process.env.PORT, () => {
  console.log(
    `Server listening to Port ${process.env.PORT} in ${process.env.NODE_ENV} mode`
  );
});
