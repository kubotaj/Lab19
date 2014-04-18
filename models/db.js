var mysql = require('mysql');

/* Database configuration */
var connection = mysql.createConnection({
        host : 'localhost',
        user : 'jkubota',
        password : '3924172'
    });

/* create db if it does not exist */
var dbToUse = 'jkubota'
var createDatabaseQry = 'CREATE DATABASE IF NOT EXISTS ' + dbToUse;
connection.query(createDatabaseQry, function (err) {
    if (err) throw err;

    //use the database for any queries run
    var useDatabaseQry = 'USE ' + dbToUse;

    //create the User table if it does not exist
    connection.query(useDatabaseQry, function (err) {
        if (err) throw err;

        var createTableQry = 'CREATE TABLE IF NOT EXISTS users('
            + 'CustomerID INT NOT NULL AUTO_INCREMENT,'
            + 'PRIMARY KEY(CustomerID),'
            + 'Name VARCHAR(30),'
            + 'Street VARCHAR(30),'
            + 'City VARCHAR(30),'
            + 'State VARCHAR(30),'
            + 'Zip VARCHAR(30),'
            + 'Phone VARCHAR(30)'
            + ')';
        connection.query(createTableQry, function (err) {
            if (err) throw err;
        });
    });
});


exports.GetAll = function(callback){
    connection.query('SELECT * FROM users',
		     function(err, result){
			 if(err){
			     console.log(err);
			     callback(true);
			     return;
			 }
			 callback(false, result);
		     }
		    );
}

exports.Insert = function(userInfo, callback){
    connection.query('INSERT INTO users SET ?', userInfo,
		     function(err, result){
			 if(err){
			     console.log(err);
			     callback(true);
			     return;
			 }
			 callback(false, result);
		     }
		    );
}


/*
//connection.query('CREATE DATABASE IF NOT EXISTS jkubota', function (err) {
// if (err) throw err;                                                 
    connection.query('USE jkubota', function (err) {
        if (err) throw err;
        connection.query('CREATE TABLE IF NOT EXISTS users('
			 + 'CustomerID INT NOT NULL AUTO_INCREMENT,'
			 + 'PRIMARY KEY(CustomerID),'
			 + 'Name VARCHAR(30),'
			 + 'Street VARCHAR(30),'
			 + 'City VARCHAR(30),'
			 + 'State VARCHAR(30),'
			 + 'Zip VARCHAR(30),'
			 + 'Phone VARCHAR(30)'
			 + ')', 
			 function (err) {
			     if (err) throw err;
			 });
    });
//});
*/

/*
exports.CreateTable = function(callback){
    connection.query('SELECT * FROM users',
		     function(err, result){
			 if(err) {
			     console.log(err);
			     callback(true);
			     return;
			     }
			 if(result > 0){
                             var responseHTML = '<html><head><title>' +
                                 'All Customers</title>' +
                                 '<link a href="/mystyle.css" rel="stylesheet">' +
                                 ' </head><body>';
                             responseHTML += '<div class="title">Customer Table</div>';
                             responseHTML += '<table class="users">' +
                                 '<tr><th>ID</th><th>Name</th></tr>';
                             for (var i=0; result.length > i; i++) {
                                 responseHTML += '<tr>' +
                                     '<td><a href="/user/?id=' +
                                     result[i].CustomerID + '">' +
                                     result[i].CustomerID + "&nbsp;" +
                                     "&nbsp;" + result[i].Name + '</a></td>' +
                                     '</tr>';
                             }
                             responseHTML += '</table>';
                             responseHTML += '</body></html>';
                             res.send(responseHTML);
                         }
                         else
                             res.send('No users exist.');
			
		     }
		    );
}		
*/		  
 
