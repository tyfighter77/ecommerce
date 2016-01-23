var Order = require('../models/Orders');
var User = require('../models/User');

module.exports = {

  create: function(req, res) {

    User.find(req.query, function(err, result){
      if (err) return res.send(err);
      else {
        var newOrder = new Order(req.body);
        newOrder.user = result[0]._id;
        newOrder.products = result[0].cart.products;
        newOrder.save(function(err, result) {
          if (err) return res.send(err);
          else res.send(result);
        });
      }
    });
  },

  read: function(req, res){
   Order.find(req.query)
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
    Order.findById(req.params.id)
    .exec(function(err, result) {
      if (err) return res.send(err);
      else res.send(result);
    });
  },

  update: function(req, res) {
    Order.findByIdAndUpdate(req.params.id, req.body, function(err, result) {
      if (err) return res.send(err);
      else res.send(result);
    });
  },

  delete: function(req, res) {
    Order.findByIdAndRemove(req.params.id, function(err, result) {
      if (err) return res.send(err);
      else res.send(result);
    });
  }
};
