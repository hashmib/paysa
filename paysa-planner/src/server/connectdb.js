var mysql = require('mysql');
       
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'Nokrigang2020!',
    database : 'paysadb'
});

connection.connect(function(err) {
    if (err) {
        console.log(err)
        throw err;
    }
    console.log("Connected to the MySQL Server ")
});

module.exports =  connection;
