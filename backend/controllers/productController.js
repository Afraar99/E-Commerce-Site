exports.getProducts = (req, res, next) => {
  res.json({
    success: true,
    message: "This route will show all products in database",
  });
};
exports.getSingleProduct = (req, res, next) => {
  res.json({
    success: true,
    message: "This route will show all single products in database",
  });
};
