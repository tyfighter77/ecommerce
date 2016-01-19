var mongoose = require('mongoose');

var productSchema = new mongoose.Schema ({
  title: { type: String, unique: true, required: true, index: true },
  price: { type: String, required: true}
});

module.exports = mongoose.model('Products', productSchema);
