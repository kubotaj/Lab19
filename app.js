// Module dependencies

var express = require('express'),
    mysql = require('mysql'),
    ejs = require('ejs'),
    connect = require('connect');

var routes = require('./controller/index');
var users = require('./controller/users');

// Application initialization

var app = express();
app.set('subtitle', 'Lab 18');
app.use(connect.urlencoded());
app.use(connect.json());
app.use(express.static('public'));

// Configuration
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Static content directory.
app.use(express.static(__dirname+'/public'));

app.use('/', routes);
app.use('/users', users);

// Begin listening
app.set('port', 8010);
app.listen(app.get('port'));
console.log("Express server listening on port",
	    app.get('port'));
