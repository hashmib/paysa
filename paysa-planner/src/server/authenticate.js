var async = require('async');
const lib = require('./library')

module.exports = {


    // Authenticates existing user 
    authenticateUser: async function(username, hash_pwd) {
        let query = 'SELECT username, password, id FROM users WHERE username = ?';
        let error_id = -1;

        const checkUser = lib.fetchFromDB(query , username);
        checkUser.then(results => {
            if (results == -1) {
                return error_id;
            }
            else if (results[0].password === hash_pwd) {
                return (results[0].id);
            }
            else {
                return error_id;
            }
        })

        return checkUser;
    },


    getUsersList: async function() {
        let query = 'SELECT id from users';
        let users = [];

        return lib.fetchFromDB(query, [])
        .then(results => {
            return new Promise((resolve, reject) => {
                let users = [];
                Object.keys(results).forEach(function(key) {
                    users.push(results[key].id)
                })
                resolve(users);
            })
        })
    },

}