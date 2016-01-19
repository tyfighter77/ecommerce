var mongoose = require('mongoose');

var productSchema = new mongoose.Schema ({
  title: { type: String, required: true, index: true },
  price: { type: String, required: true},
  img: {type: String}
});

module.exports = mongoose.model('Products', productSchema);
