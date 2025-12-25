const mongoose = require('mongoose');

const menuSchema = mongoose.Schema({
  day: { type: String, required: true }, // e.g., "Monday"
  lunch: { type: String, required: true }, // e.g., "Rajma Chawal"
  lunchItems: [String], // e.g., ["Rajma", "Jeera Rice", "Curd", "Salad"]
  lunchImage: { type: String },
  dinner: { type: String, required: true }, // e.g., "Aloo Gobhi"
  dinnerItems: [String],
  dinnerImage: { type: String }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Menu', menuSchema);