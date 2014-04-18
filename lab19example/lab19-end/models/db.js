var mysql   = require('mysql');


/* DATABASE CONFIGURATION */
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'jkubota',
    password: '3924172'
});

var dbToUse = 'jkubota'
var createDatabaseQry = 'CREATE DATABASE IF NOT EXISTS ' + dbToUse;
connection.query(createDatabaseQry, function (err) {
    if (err) throw err;

    //use the database for any queries run
    var useDatabaseQry = 'USE ' + dbToUse;

    //create the User table if it does not exist
    connection.query(useDatabaseQry, function (err) {
        if (err) throw err;

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

exports.GetAll = function(callback) {
    connection.query('select UserID, Email from User',
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
}

exports.Insert = function(userInfo, callback) {
    connection.query('INSERT INTO User SET ?', userInfo,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return
            }
            callback(false, result);
        }
    );
}
