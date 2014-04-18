var express = require('express');
var router = express.Router();

var db = require('../models/db');

/* Example 2 - Create User */
/*
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
*/

router.get('/create', function(req, res){
    res.render('simpleform.ejs', {action: '/user/create'});
});

router.post('/create', function (req, res) {
    db.Insert(req.body, function(err, result){
	if(err) throw err;

	if(result.UserID != 'undefined'){
	    var placeHolderValues = {
		email: req.body.email,
		password: req.body.password
	    };
	    res.render('displayUserInfo.ejs',
		       placeHolderValues);
	    }
	else{
	    res.send('User was not Inserted.');
	    }
    }
	      );
});


/* Example 3 - View all users */
router.get('/all', function (req, res) {
    db.GetAll(function(err, result){
	if(err) throw err;
	res.render('displayUserTable.ejs', {rs: result});
    }
	     );
});

/* View a single user */
router.get('/', function (req, res) {
    var query = 'select UserID, Email from user WHERE UserID = ' + req.query.userid;
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


module.exports = router;
