var express = require('express');
var load = require('express-load');
var expressValidator = require("express-validator");
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');

global.db = mongoose.connect("mongodb://localhost/nwitter");

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressValidator());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.cookieParser());
app.use(express.session({'secret': 'seuSegredoAqui'}));
app.use(express.bodyParser());
app.use(app.router);

load('models').
then('controllers').
then('routes').
into(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});