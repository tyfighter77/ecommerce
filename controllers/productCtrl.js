var Product = require('../models/productModel');

module.exports = {

  create: function(req, res) {
    var newProduct = new Product(req.body);
    newProduct.save(function(err, result) {
      if (err) return res.send(err);
      else res.send(result);
    });
  },

  read: function(req, res){
   Product.find(req.query)
   .exec()
   .then(function(err, result){
     if(err){
       console.log(err);
       res.send(err);
     }
     else {
       console.log('get ctrl');
       res.send(result);
     }
   });
 },

  readOne: function(req, res) {
    Product.findById(req.params.id)
    .exec(function(err, result) {
      if (err) return res.send(err);
      else res.send(result);
    });
  },

  update: function(req, res) {
    Product.findByIdAndUpdate(req.params.id, req.body, function(err, result) {
      if (err) return res.send(err);
      else res.send(result);
    });
  },

  delete: function(req, res) {
    Product.findByIdAndRemove(req.params.id, function(err, result) {
      if (err) return res.send(err);
      else res.send(result);
    });
  }
};
