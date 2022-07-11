const mongoose = require('mongoose');

const vehicleSquema = new mongoose.Schema({
  name: String,
  brand: String,
  description: String,
  plate: String,
  isFavorite: Boolean,
  year: Number,
  color: String,
  price: Number,
  createdAt: { type: Date, default: Date.now }

});




module.exports = mongoose.model('Vehicle', vehicleSquema)
