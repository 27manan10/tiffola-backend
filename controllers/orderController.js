const Order = require('../models/Order');

// 1. ADD ORDER
const addOrder = async (req, res) => {
  try {
    const { planName, price, duration, dropAddress, status } = req.body;

    if (!planName || !price || !dropAddress) {
      return res.status(400).json({ message: 'Please add all order fields' });
    }

    const order = await Order.create({
      user: req.user._id,
      planName,
      price,
      duration,
      dropAddress,
      status: status || 'Active',
      skippedDates: [] // Initialize empty
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server Error creating order' });
  }
};

// 2. GET MY ORDERS
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server Error fetching orders' });
  }
};

// 3. TOGGLE SKIP DATE (NEW!)
const toggleSkipDate = async (req, res) => {
  try {
    const { orderId, date } = req.body; // date format: "YYYY-MM-DD"
    
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    // Check if user owns this order
    if (order.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    // Toggle logic: If date exists, remove it (Un-pause). If not, add it (Pause).
    if (order.skippedDates.includes(date)) {
      order.skippedDates = order.skippedDates.filter(d => d !== date);
    } else {
      order.skippedDates.push(date);
    }

    await order.save();
    res.json(order.skippedDates);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { addOrder, getMyOrders, toggleSkipDate };