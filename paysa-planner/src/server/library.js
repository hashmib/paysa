// Server-side Function Library
const crypto = require('crypto');
var mysql = require('./connectdb');
const { resolve } = require('path');
var async = require('async');


module.exports = {

    insertIntoDB: async function(insertQuery, values) {
        return new Promise((resolve, reject) => {
            mysql.query(insertQuery, [values], (error, results, fields) => {
                if (error) reject(error);
                else {
                    resolve(true)
                }
            });
        });
    },

    fetchFromDB: async function(fetchQuery, values) {
        return new Promise((resolve, reject) => {
            mysql.query(fetchQuery, [values], (error, results, fields) => {
                if (error) reject(error);
                else {
                    if (results && results.length > 0) {
                        resolve(results);
                    }
                    resolve(-1);
                }
            });
        });
    },

    getFormattedDate: function(date) {
        return new Date(date).toISOString().slice(0, 19).replace('T', ' ');
    },

    getFormattedDateToday: function() {
        return new Date().toISOString().slice(0, 19).replace('T', ' ');
    },

    // Returns SHA-256 hash of user's password to be stored in db
    getHashedPassword: function(password) {
        const sha256 = crypto.createHash('sha256');
        const hash = sha256.update(password).digest('base64');
        return hash;
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

    
    /* 
    
    Expected format of expense
    [{
        value: 
        label:
        start:
        end:
        frequency:
    }]
    Note: lastdate will be NULL if currentDate < startDate
    */
    addRecurringExpense: async function(expenses, userid) {
        let currentDate = this.getFormattedDateToday();
        let tr_type = 'expense';
        let query = 'INSERT INTO Recurrences(userid, type, amount, description, start_date, end_date, frequency) VALUES(?)';

        let promises = [];
        expenses.map((expense) => {
            expense['start'] = this.getFormattedDate(expense['start']);
            expense['end'] = this.getFormattedDate(expense['end'])
            let values = [
                userid,
                tr_type,
                expense['value'],
                expense['label'],
                expense['start'],
                expense['end'],
                expense['frequency']
            ];
            promises.push(this.insertIntoDB(query, values));
        });
        return Promise.all(promises)
    },


    addRecurringIncome: async function(incomes, userid) {
        let tr_type = 'income';
        let query = 'INSERT INTO Recurrences(userid, type, amount, description, start_date, end_date, frequency) VALUES(?)';

        let promises = [];
        incomes.map((income) => {
            income['start'] = this.getFormattedDate(income['start']);
            income['end'] = this.getFormattedDate(income['end'])
            let values = [
                userid,
                tr_type,
                income['value'],
                income['label'],
                income['start'],
                income['end'],
                income['frequency']
            ];
            promises.push(this.insertIntoDB(query, values));
        });
        return Promise.all(promises)
    },

    // todo: error handling
    handleConfigure: async function(income, expenses, userid) {
        let addedExpenses = this.addRecurringExpense(expenses, userid);
        addedExpenses.then(added => {
            console.log("/configure - expenses added successfully")
        }, error => {
            console.log("/configure - error inserting into recurring db");
        });

        let addedIncomes = this.addRecurringIncome(income, userid);
        addedIncomes.then(added => {
            console.log("/configure - incomes added successfully")
        },  error => {
            console.log("/configure - error inserting income recurring db");
        });

        return addedIncomes;
    },


    // for dashboard button
    handleAddExpense: async function(expense, userid) {
        let addedExpense = this.addRecurringExpense(expense, userid);
        addedExpense.then(added => {
            console.log("/addexpense - expense added successfully")
        }, error => {
            console.log("/addexpense - error inserting into recurring db");
        });

        return addedExpenses;
    },
}