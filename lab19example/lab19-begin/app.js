var express = require('express'),   // web framework
    mysql   = require('mysql'),
    ejs     = require('ejs'),
    connect = require('connect');   // GET and POST request parser

var app = express();                // initialize express

//app.use(connect.bodyParser());      // initialize request parser
app.use(connect.urlencoded());
app.use(connect.json());

app.use(express.static('public'));  // configure static directory

app.set('view engine', 'ejs');       // set .ejs as the default template extension.
app.set('views', __dirname + '/views'); //set where view templates are located

// subtitle values access via the header template
app.set('subtitle', 'Lab 19');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection({
    host:       'cwolf.cs.sonoma.edu',
    user:       '',
    password:   ''
});

// create the ExampleDB if it does not exist.
var dbToUse = 'ExampleDB'
var createDatabaseQry = 'CREATE DATABASE IF NOT EXISTS ' + dbToUse;
connection.query(createDatabaseQry, function (err) {
    if(err) throw err;

    var useDatabaseQry = 'USE ' + dbToUse;

    connection.query(useDatabaseQry, function(err) {
        if(err) throw err;

        var createTableQry = 'CREATE TABLE IF NOT EXISTS User('
            + 'UserID INT AUTO_INCREMENT PRIMARY KEY'
            + ',Email VARCHAR(256)'
            + ',Password VARCHAR(50)'
            + ')';
        connection.query(createTableQry, function (err) {
            if (err) throw err;
        });
    });
});

// Return the text Hello, World!.
app.get('/hello', function(req, res){
    res.send('Hello, World!');
});


/* index file that links to various examples */
app.get('/', function(req, res){
    res.render('index');
});

/* Example 1 - HTML Form w/o Ajax or Database Interaction */
app.get('/simpleForm', function(req, res){
    res.render('simpleform.ejs', {action: '/displayFormData'});
});

/* Example 1 - Display form data submitted above */
app.post('/displayFormData', function(req, res) {
    res.render('displayFormData.ejs', req.body );
});


/* Example 2 - Create User */
app.get('/user/create', function(req, res){
    res.render('simpleform.ejs', {action: '/user/create'});
});

app.post('/user/create', function (req, res) {
    connection.query('INSERT INTO User SET ?', req.body,
        function (err, result) {
            if (err) throw err;

            if(result.UserID != 'undefined') {
                var placeHolderValues = {
                    email: req.body.email,
                    password: req.body.password
                };
                res.render('displayUserInfo.ejs', placeHolderValues);
            }
            else {
                res.send('User was not inserted.');
            }
        }
    );
});

/* Example 3 - View all users */
app.get('/user/all', function (req, res) {
    connection.query('select UserID, Email from User',
        function (err, result) {
            res.render('displayUserTable.ejs', {rs: result});
        }
    );
});


/* View a single user */
app.get('/user', function (req, res) {
    var query = 'select UserID, Email from User WHERE UserID = ' + req.query.userid;
    console.log(req.query);
    connection.query(query,
        function (err, result) {
            if(typeof result != 'undefined' && result.length > 0) {
                //NOTE: We are using the same template here as for the view of all users
                res.render('displayUserTable', {rs: result});
            }
            else {
                res.send('No users exist.');
            }
        }
    );
});

app.set('port', 3000 );
app.listen(app.get('port'));
console.log("Express server listening on port", app.get('port'));