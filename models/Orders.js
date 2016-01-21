var mongoose = require('mongoose');
// var productSchema = require('./productModel');

var orderSchema = new mongoose.Schema ({
  date: { type: Date, default: Date.now, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref:'User'},
  products: []
});

module.exports = mongoose.model('Orders', orderSchema);
