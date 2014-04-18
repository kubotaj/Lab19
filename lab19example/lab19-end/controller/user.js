var express = require('express');
var router  = express.Router();
var db   = require('../models/db');


/* View all users in a <table> */
router.get('/all', function (req, res) {
    db.GetAll(function (err, result) {
            if (err) throw err;
            res.render('displayUserTable.ejs', {rs: result});
        }
    );
});

/* Create a User */

// Create User Form
router.get('/create', function(req, res){
    res.render('simpleform.ejs', {action: '/user/create'});
});

// Save User to the Database
router.post('/create', function (req, res) {
    db.Insert( req.body, function (err, result) {
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

/* View a single user's information */
/* INCOMPLETE */
router.get('/', function (req, res) {
    /*
    var query = 'select UserID, Email from User WHERE UserID = ' + req.query.userid;
    console.log(req.query);
    connection.query(query,
        function (err, result) {
            if(typeof result != 'undefined' && result.length > 0) {
                res.render('displayUserTable', {rs: result});
            }
            else {
                res.send('No users exist.');
            }
        }
    );
    */
    res.send('Implement this as part of lab 19');
});


module.exports = router;

