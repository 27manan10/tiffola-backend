const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // NEW: Store multiple addresses
  addresses: [{
    label: { type: String, required: true }, // e.g., "Home", "Office"
    fullAddress: { type: String, required: true } // e.g., "B-404, Gota, Ahmedabad"
  }]
}, {
  timestamps: true,
});

module.exports = mongoose.model('User', userSchema);