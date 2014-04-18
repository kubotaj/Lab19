var express = require('express');
var router = express.Router();

// Return the text Hello, World!.                                               
router.get('/hello', function(req, res){
    res.send('Hello, World!');
});

/* index file that links to various examples */
router.get('/', function(req, res){
    res.render('index');
});

/* Example 1 - HTML Form w/o Ajax or Database Interaction */
router.get('/simpleForm', function(req, res){
    res.render('simpleform.ejs', {action: '/displayFormData'});
});

/* Example 1 - Display form data submitted above */
router.post('/displayFormData', function(req, res) {
    res.render('displayFormData.ejs', req.body );
});


module.exports = router;
