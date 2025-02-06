const Product = require('../models/Product');

// Create a new product
const createProduct = async (req, res) => {
  const { name, description, image, originalPrice, discountPrice, sellingPrice, quantity, uom, hsnCode } = req.body;

  try {
    const newProduct = new Product({ name, description, image, originalPrice, discountPrice, sellingPrice, quantity, uom, hsnCode });
    await newProduct.save();
    res.status(201).json({ msg: 'Product created successfully', product: newProduct });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

module.exports = { createProduct, getAllProducts };
