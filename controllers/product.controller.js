const Product = require("../models/product.model");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");

const getProducts = asyncWrapper(async (req, res) => {
  const products = await Product.find({});
  res.status(200).json({ products });
});

const getProduct = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findOne({ _id: id });
  if (!product) {
    return next(createCustomError(`No product with id : ${id}`, 404));
  }
  res.status(200).json({ product });
});

const createProduct = asyncWrapper(async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json({ product });
});

const updateProduct = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!product) {
    return next(createCustomError(`No product with id : ${id}`, 404));
  }
  res.status(200).json({ product });
});

const deleteProduct = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findByIdAndDelete(id);
  if (!product) {
    return next(createCustomError(`No product with id : ${id}`, 404));
  }
  res.status(200).json({ product });
});

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
