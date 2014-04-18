var express = require('express');
var router = express.Router();
var db = require('../models/db');

/*
router.get('/', function(req, res){
    db.GetAll(function(err, result){
	if(err) throw err;
	res.render('displayUserTable.ejs', {rs:result});
	});
});

// return all users
router.get('/', function (req, res) {
    connection.query('select * from users',
		     function (err, result) {
			 return result;
		     }
		    );
});

// get all users in a <table>
router.get('/table', function (req, res) {
    db.CreateTable(function(err, result){
	if(err) throw err;
//	res.render('displayUserTable.ejs', {rs: result});
	return result;
	}
		   );
});


// get all users in a <select>
router.post('/select', function (req, res) {
    console.log(req.body);
    connection.query('select * from users',
		     function (err, result) {
			 console.log(result);
			 var responseHTML = '<select id="user-list">';
			 for (var i=0; result.length > i; i++) {
			     var option = '<option value="' + 
				 result[i].CustomerID + '">' + 
				 result[i].Name + '</option>';
			     console.log(option);
			     responseHTML += option;
			 }
			 responseHTML += '</select>';
			 res.send(responseHTML);
		     });
});

router.get('/all', function(req, res){
    db.Getall(function(err, result){
	if(err) throw err;
	res.render('displayUserTable.ejs', {re: result});
	}
	     );
});
*/

router.get('/create', function(req, res){
    res.render('simpleform.ejs', {action: '/users/create'});
});

router.post('/create', function (req, res) {
    db.Insert(req.body, function(err, result){
	if(err) throw err;

	if(result.UserID != 'undefined'){
	        var placeHolderValues = {
		    name: req.body.name,
		    street: req.body.street,
		    city: req.body.city,
		    state: req.body.state,
		    zip: req.body.zip
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
    var query = 'select * from users WHERE CustomerID = ' + req.query.Customerid;
    console.log(req.query);
    connection.query(query,
		     function (err, result) {
			 if(typeof result != 'undefined' && 
			    result.length > 0) {
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
