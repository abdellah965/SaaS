const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  // --- NEW FIELDS FOR BUSINESS LOGIC ---
  apiUsageCount: {
    type: Number,
    default: 0, // Everyone starts at 0 uses
  },
  isPro: {
    type: Boolean,
    default: false, // Everyone starts as a free user
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);