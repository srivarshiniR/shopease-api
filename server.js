const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const userRoutes = require('./src/routes/userRoutes');
const productRoutes = require('./src/routes/productRoutes');
const orderRoutes = require('./src/routes/orderRoutes');
const cartRoutes = require('./src/routes/cartRoutes');
const cors = require('cors');

// Initialize app
const app = express();

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Middleware to parse JSON
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000', // Allow frontend requests
  credentials: true
}));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/cart', cartRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
