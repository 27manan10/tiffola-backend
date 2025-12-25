const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  planName: { type: String, required: true },
  price: { type: Number, required: true },
  duration: { type: String, required: true },
  dropAddress: { type: String, required: true },
  status: { type: String, default: 'Active' },
  // NEW: Array to store dates user wants to skip (e.g., ["2023-10-25", "2023-10-28"])
  skippedDates: [String] 
}, {
  timestamps: true,
});

module.exports = mongoose.model('Order', orderSchema);