// Server-side Function Library
const crypto = require('crypto');
var mysql = require('./connectdb');


module.exports = {

    // Returns SHA-256 hash of user's password to be stored in db
    getHashedPassword: function(password) {
        const sha256 = crypto.createHash('sha256');
        const hash = sha256.update(password).digest('base64');
        return hash;
    },

    // todo: buggy 
    // Authenticates existing user 
    authenticateUser: function(username, hash_pwd) {
        let query = 'SELECT username, password FROM users WHERE username = \'' + username + '\'';
        mysql.query(query, function(err, data, fields) {
            if (err) throw err;
        });
        return true;
    },

    // todo: check if username already exists in database
    // todo: add correct error handling
    // Returns boolean if registration successful
    registerUser: function(username, hashed_pwd) {
        //var query1 = mysql.query('SELECT COUNT(username) FROM USERS WHERE EXISTS ')

        let query = 'INSERT INTO users(username, password) VALUES(?)';
        let values = [
            username,
            hashed_pwd
        ];
        
        let ex = mysql.query(query, [values], function(err, data, fields) {
            if (err) throw err;
        });

        return true;
    }
}