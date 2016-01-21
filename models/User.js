var mongoose = require('mongoose');
var cartSchema = require('./Carts');

var userSchema = new mongoose.Schema ({
  email: { type: String, lowercase: true },
  username: { type: String, lowercase: true, maxlength: 20 },
  password: { type: String },
  cart: cartSchema
});

module.exports = mongoose.model('Users', userSchema);
