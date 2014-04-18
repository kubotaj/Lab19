// import libraries
var express = require('express'),
    ejs     = require('ejs'),
    connect = require('connect');

// import routes
var routes = require('./controller/index');
var user  = require('./controller/user');

// initialize express
var app = express();

// these two lines replace bodyParser()
app.use(connect.urlencoded());
app.use(connect.json());

// configure static directory
app.use(express.static('public'));

//configure view rendering engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// subtitle values access via the header template
app.set('subtitle', 'Lab 19');

//configure routes
app.use('/', routes);
app.use('/user', user);

app.set('port', 3000 );
app.listen(app.get('port'));
console.log("Express server listening on port", app.get('port'));