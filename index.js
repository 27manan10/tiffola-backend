require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// --- IMPORT ROUTES ---
const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');
const planRoutes = require('./routes/planRoutes'); // <--- 1. NEW: Import Plan Routes
const menuRoutes = require('./routes/menuRoutes'); // <--- Import

// Initialize Express App
const app = express();

// --- MIDDLEWARE ---
app.use(express.json()); // Allows server to read JSON data
app.use(cors());         // Security: Allows your App to talk to this Server

// --- DATABASE ---
// Connect to MongoDB
connectDB();

// --- USE ROUTES ---
// This acts as a traffic controller.
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/plans', planRoutes); // <--- 2. NEW: Enable Plan Routes
app.use('/api/menu', menuRoutes); // <--- Enable Route

// --- TEST ROUTE ---
app.get('/', (req, res) => {
  res.status(200).json({ 
    message: 'Welcome to Tiffola API 🚀',
    status: 'Running',
    timestamp: new Date()
  });
});

// --- START SERVER ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🚀 Server is running on port ${PORT}`);
  console.log(`   Test URL: http://localhost:${PORT}`);
});