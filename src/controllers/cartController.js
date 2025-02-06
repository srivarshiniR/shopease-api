const Cart = require('../models/Cart');

// Get User Cart
const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
    if (!cart) return res.status(200).json({ msg: 'Cart is empty', items: [] });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

// Add Item to Cart
const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      cart = new Cart({ user: req.user.id, items: [] });
    }

    const existingItem = cart.items.find(item => item.product.toString() === productId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    res.status(200).json({ msg: 'Item added to cart', cart });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

// Update Cart Item
const updateCartItem = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) return res.status(404).json({ msg: 'Cart not found' });

    const item = cart.items.find(item => item.product.toString() === productId);
    if (item) {
      item.quantity = quantity;
    }

    await cart.save();
    res.status(200).json({ msg: 'Cart updated', cart });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

// Remove Item from Cart
const removeFromCart = async (req, res) => {
  const { productId } = req.body;

  try {
    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) return res.status(404).json({ msg: 'Cart not found' });

    cart.items = cart.items.filter(item => item.product.toString() !== productId);

    await cart.save();
    res.status(200).json({ msg: 'Item removed from cart', cart });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

// Clear Cart After Order
const clearCart = async (req, res) => {
  try {
    await Cart.findOneAndDelete({ user: req.user.id });
    res.status(200).json({ msg: 'Cart cleared' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

module.exports = { getCart, addToCart, updateCartItem, removeFromCart, clearCart };
