var mongoose = require('mongoose');

var cartSchema = new mongoose.Schema ({
  products: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref:'Products'},
    qty: { type: Number} }]
});

module.exports = cartSchema;
