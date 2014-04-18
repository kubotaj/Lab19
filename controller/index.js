var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.render('index');
});

router.get('/templatesample', function(req, res) {
    res.render('templatesample.ejs');
});

router.get('/entercustomer.html', function(req, res) {                             
    res.sendfile(__dirname + '/entercustomer.html');                            
});                                                                         
                                                                                
router.get('/searchcustomer.html', function(req, res) {                            
    res.sendfile(__dirname + '/searchcustomer.html');                           
});                                                                         
                                                                                
router.get('/selectcustomer.html', function(req, res) {                            
    res.sendfile(__dirname + '/selectcustomer.html');                           
});                                                                         
                                                                                
router.get('/customertable.html', function(req, res) {                             
    res.sendfile(__dirname + '/customertable.html');                            
});


module.exports = router;
