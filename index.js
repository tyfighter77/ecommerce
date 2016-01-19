var express = require('express');
var mongojs = require('mongojs');
var bodyParser = require('body-parser');
var cors = require('cors');
var session = require('express-session');
var ObjectId = require('mongodb').ObjectId;

var app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname+'./public'));
app.use(cors());

var nodePort = 3000;

var db = mongojs('ecommerce', ['products']);

app.post('/products', function (req, res){
  var dataToInsert = req.body;
  db.products.insert(dataToInsert, function(err, result){
    if(err){
      res.status(500).end();
    }
      console.log("Successfully posted");
      res.send(result);
  });
});

app.get('/products', function (req, res){
  db.products.find({}, function(err, result){
    if(err){
      res.status(500).end();
    }
      console.log("Successfully retrieved");
      res.send(result);
  });
});

app.get('/products/:id', function (req, res){
  var idToGet = ObjectId(req.params.id);
  db.products.find({_id:idToGet}, function(err, result){
    if(err){
      res.status(500).end();
    }
      console.log("Successfully retrieved by id");
      res.send(result);
  });
});

app.put('/products/:id', function (req, res){
  var idToModify = ObjectId(req.params.id);

  var updateObject = {
    query: {_id: idToModify},
    update: {$set: req.body},
    new: false
  };

  db.products.findAndModify(updateObject, function(err, result){
    console.log("Successfully updated");
    res.send(result);
  });
});

app.delete('/products/:id', function (req, res){
  var idToDelete = ObjectId(req.params.id);
  db.products.remove({_id: idToDelete}, function(err, result){
    if(err){
      res.status(500).send("Failed to delete");
    }
    res.send("Successfully deleted record");
  });
});

app.listen(nodePort, function(){

});
