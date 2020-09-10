// Server-side Function Library
const crypto = require('crypto');
var mysql = require('./connectdb');
const { resolve } = require('path');


module.exports = {

    // Returns SHA-256 hash of user's password to be stored in db
    getHashedPassword: function(password) {
        const sha256 = crypto.createHash('sha256');
        const hash = sha256.update(password).digest('base64');
        return hash;
    },

    // Authenticates existing user 
    authenticateUser: async function(username, hash_pwd) {
        let query = 'SELECT username, password, id FROM users WHERE username = \'' + username + '\'';
        let error_id = -1;
        try {
            const result = await new Promise((resolve, reject) => {
                mysql.query(query, (error, results, fields) => {
                    if (error) return reject(error);
                    if (results[0].password === hash_pwd) {
                        return resolve(results[0].id)
                    }
                    else {
                        return resolve(error_id)
                    }
                });
            });
            return result;
        } catch (err) {
            console.log("error querying database");
        }
    },

    checkUserExists: async function(username) {
        
        try {
            const result = await new Promise((resolve, reject) => {
                mysql.query(userExistQuery, username, (error, results, fields) => {
                    if (error) return reject(error);
                    if (results[0].total > 0) {
                        return resolve(false);
                    }
                    return resolve(true);
                });
            });
            return result;
        } catch (err) {
            console.log("error querying database");
        }
    },


    addUserEntry: async function(username, password) {
        let query = 'INSERT INTO users(username, password) VALUES(?)';
        let userExistQuery = "SELECT COUNT(*) AS total FROM users WHERE username = ?";
        let userid_query = 'SELECT id from users WHERE username = ?'
        let values = [
            username,
            password
        ];

        try {
            const result = await new Promise((resolve, reject) => {
                // Check if username exists in database
                mysql.query(userExistQuery, username,(error, exists, fields) => {
                    if (error) return reject(error);
                    if (exists[0].total > 0) {
                        return resolve(-1);
                    }
                });

                // Insert new user into db
                mysql.query(query, [values], (error, results, fields) => {
                    if (error) return reject(error);
                });

                // Get user id of newlyadded 
                mysql.query(userid_query, username,(error, ids, fields) => {
                    if (error) return reject(error);

                    return resolve(ids[0].id)
                });

            });
            return result;
        } catch (err) {
            console.log("error querying database");
        }
    },

    registerUser: async function(username, hashed_pwd) {
        return this.addUserEntry(username, hashed_pwd);
    },


    addUserTransaction: async function(income, expenses, recurring) {
        // Populate User Transaction db
        console.log('todo')


        // Populate Transaction db
    }

    
}