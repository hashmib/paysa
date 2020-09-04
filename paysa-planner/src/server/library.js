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
                    if (results[0].password === hash_pwd) {
                        return resolve(true)
                    }
                    else {
                        return resolve(false)
                    }
                });
            });
            return result;
        } catch (err) {
            console.log("error querying database");
        }
    },

    checkUserExists: async function(username) {
        let userExistQuery = "SELECT COUNT(*) AS total FROM users WHERE username = ?";
        
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
        let values = [
            username,
            password
        ];

        try {
            const result = await new Promise((resolve, reject) => {
                mysql.query(query, [values], (error, results, fields) => {
                    if (error) return reject(error);
                    return resolve(true);
                });
            });
            return result;
        } catch (err) {
            console.log("error querying database");
        }
    },

    // Returns boolean if registration successful
    registerUser: async function(username, hashed_pwd) {
        const userExist = this.checkUserExists(username);
        userExist.then(async authorized => {
            if (authorized) {
                const addedUser = this.addUserEntry(username, hashed_pwd);
            }
        })
        return userExist;
    },


    addUserTransaction: async function(income, expenses, recurring) {
        // Populate User Transaction db
        console.log('todo')


        // Populate Transaction db
    }

    
}