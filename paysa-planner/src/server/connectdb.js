var mysql = require('mysql');
       
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'nokrigang2020',
    database : 'paysadb'
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports =  connection;