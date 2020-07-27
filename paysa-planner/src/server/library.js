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

    // Authenticates existing user 
    authenticateUser: function(req) {
        const correctCredentials = {
            username: "admin",
            password: "pass"
        }
    
        console.log("req.username: ", req.username)
        console.log("correct.username: ", correctCredentials.username)
        console.log("req.password: ", req.password)
        console.log("correct.password: ", correctCredentials.password)
        
        return (req.username == correctCredentials.username 
            && req.password ==correctCredentials.password);
    },

    registerUser: function(username, hashed_pwd) {
        var query = mysql.query('SELECT * FROM users', function(err, data, fields) {
            if (err) throw err;
            console.log(data);
        });


    }
}