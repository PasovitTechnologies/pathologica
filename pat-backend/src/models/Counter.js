const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
  month: { type: Number, required: true }, // 1-12
  year: { type: Number, required: true },  // e.g., 2025
  count: { type: Number, default: 0 },     // Form number counter
});

module.exports = mongoose.model('Counter', counterSchema);