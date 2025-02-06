const express = require('express');
const router = express.Router();
const { placeOrder, getAllOrders, getUserOrderHistory } = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

router.post('/place', authMiddleware, placeOrder);
router.get('/all', authMiddleware, adminMiddleware, getAllOrders);
router.get('/history', authMiddleware, getUserOrderHistory);

module.exports = router;
