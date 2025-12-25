const mongoose = require('mongoose');

const planSchema = mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  duration: { type: String, required: true },
  type: { type: String, enum: ['KITCHEN', 'LOGISTICS'], required: true },
  description: { type: String },
  color: { type: String, default: '#f0f0f0' }, // UI Color
  image: { type: String, required: true },
  features: [String] // Array of bullet points like ["2 Chapatis", "Dal"]
}, {
  timestamps: true,
});

module.exports = mongoose.model('Plan', planSchema);