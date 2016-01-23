var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');
var productCtrl = require('./controllers/productCtrl');
var userCtrl = require('./controllers/userCtrl');
var orderCtrl = require('./controllers/orderCtrl');
var session = require('express-session');
var passport = require('passport');
var passportCtrl = require('./controllers/passportCtrl');
var config = require('./config');

var app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(session(config.session));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + './../public'));



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

//Auth endpoints
app.post('/auth/local/register', passportCtrl.register);
app.post('/auth/local', passport.authenticate('local'), function(req, res) {
  //This is only called if login was Successfully
  res.json(req.user);
});

app.listen(nodePort, function(){
  console.log("Now listening at port " + nodePort);
});
