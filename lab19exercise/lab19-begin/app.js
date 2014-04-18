var express = require('express'),   // web framework
    mysql   = require('mysql'),
    ejs     = require('ejs'),
    connect = require('connect');   // GET and POST request parser

var routes = require('./controller/index');
var user = require('./controller/user');

var app = express();                // initialize express

//app.use(connect.bodyParser());      // initialize request parser
app.use(connect.urlencoded());
app.use(connect.json());

app.use(express.static('public'));  // configure static directory

app.set('view engine', 'ejs');       // set .ejs as the default template extension.
app.set('views', __dirname + '/views'); //set where view templates are located

// subtitle values access via the header template
app.set('subtitle', 'Lab 19');

app.use('/', routes);
app.use('/user', user);

app.set('port', 8010 );
app.listen(app.get('port'));
console.log("Express server listening on port", app.get('port'));
