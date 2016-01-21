var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');
var productCtrl = require('./controllers/productCtrl');
var userCtrl = require('./controllers/userCtrl');
var orderCtrl = require('./controllers/orderCtrl');

var app = express();
app.use(bodyParser.json());
app.use(cors());

var nodePort = 3000;

var mongoUri = "mongodb://localhost:27017/ecommerce";
mongoose.connect(mongoUri);
mongoose.connection.once('open', function(){
  console.log("Successfully connected to mongodb");
});

app.get('/products', productCtrl.read);
app.get('/products/:id', productCtrl.readOne);
app.put('/products/:id', productCtrl.update);
app.post('/products', productCtrl.create);
app.delete('/products/:id', productCtrl.delete);

app.get('/user', userCtrl.read);
app.get('/user/:id', userCtrl.readOne);
app.put('/user/:id', userCtrl.update);
app.post('/user', userCtrl.create);
app.delete('/user/:id', userCtrl.delete);

app.post('/orders', orderCtrl.create);
app.get('/orders', orderCtrl.read);
app.put('/cart/:id', userCtrl.updateCart);

app.listen(nodePort, function(){
  console.log("Now listening at port " + nodePort);
});
