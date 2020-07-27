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
    authenticateUser: async function(username, hash_pwd) {
        let query = 'SELECT username, password FROM users WHERE username = \'' + username + '\'';
        try {
            const result = await new Promise((resolve, reject) => {
                mysql.query(query, (error, results, fields) => {
                    if (error) return reject(error);
                    return resolve(results);
                });
            });

            return (hash_pwd === result[0].password)
        } catch (err) {
            console.log("error querying database");
            return false;
        }
    },

    // todo: check if username already exists in database
    // Returns boolean if registration successful
    registerUser: async function(username, hashed_pwd) {
        let query = 'INSERT INTO users(username, password) VALUES(?)';
        let values = [
            username,
            hashed_pwd
        ];

        try {
            const result = await new Promise((resolve, reject) => {
                mysql.query(query, [values], (error, results, fields) => {
                    if (error) return reject(error);
                    return resolve(results);
                });
            });
            return true;
        } catch (err) {
            console.log("error querying database");
            return false;
        }
    }
}