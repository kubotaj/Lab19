var mysql = require('mysql');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection({
    host:       'localhost',
    user:       'jkubota',
    password:   '3924172'
});

// create the ExampleDB if it does not exist.
var dbToUse = 'jkubota'
var createDatabaseQry = 'CREATE DATABASE IF NOT EXISTS ' + dbToUse;
connection.query(createDatabaseQry, function (err) {
    if(err) throw err;

    var useDatabaseQry = 'USE ' + dbToUse;

    connection.query(useDatabaseQry, function(err) {
        if(err) throw err;

        var createTableQry = 'CREATE TABLE IF NOT EXISTS user('
            + 'UserID INT AUTO_INCREMENT PRIMARY KEY'
            + ',Email VARCHAR(256)'
            + ',Password VARCHAR(50)'
            + ')';
        connection.query(createTableQry, function (err) {
            if (err) throw err;
        });
    });
});

exports.GetAll = function(callback){
    connection.query('select UserID, Email from user',
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
//    connection.query('INSERT INTO user SET ?', userInfo,
    connection.query('INSERT INTO User SET ?', userInfo,
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

