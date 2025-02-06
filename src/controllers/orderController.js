const Order = require('../models/Order');

// Place Order
const placeOrder = async (req, res) => {
  const { products, totalPrice } = req.body;
  const userId = req.user.id; 

  try {
    
    const newOrder = new Order({ user: userId, products, totalPrice });
    await newOrder.save();
    res.status(201).json({ msg: 'Order placed successfully', order: newOrder });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

// Get All Orders (Admin view)
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'name email').populate('products.productId', 'name image sellingPrice');
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

// Get Order History for Logged-in User
const getUserOrderHistory = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate('products.productId', 'name image sellingPrice');
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

module.exports = { placeOrder, getAllOrders, getUserOrderHistory };
