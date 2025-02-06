const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  originalPrice: { type: Number, required: true },
  discountPrice: { type: Number, required: true },
  sellingPrice: { type: Number, required: true },
  quantity: { type: Number, required: true },
  uom: { type: String, required: true },
  hsnCode: { type: String, required: true },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
