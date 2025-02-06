const express = require('express');
const router = express.Router();
const { getCart, addToCart, updateCartItem, removeFromCart, clearCart } = require('../controllers/cartController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, getCart);
router.post('/add', authMiddleware, addToCart);
router.put('/update', authMiddleware, updateCartItem);
router.delete('/remove', authMiddleware, removeFromCart);
router.delete('/clear', authMiddleware, clearCart);

module.exports = router;
