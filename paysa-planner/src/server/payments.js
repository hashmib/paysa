const lib = require('./library');
var async = require('async');


module.exports = {
    /* high level thinking
    
    return next 10 for now, will probably take some arg -> limit 
    perhaps implement with infinite scroll later for the component

    1. for all recurrences where last date = NULL
            if limit is 10, then fetch all startDates in this month and next month


    2.      Object.keys(results).forEach(function(key) {
                var row = results[key];
                upcoming.push(row.amount);
            })

    */
    sortPaymentDates: function(data) {
        return new Promise((resolve, reject) => {
            resolve(data.sort(function(a,b){
                return new Date(a.next_date) - new Date(b.next_date)
              }));
        })
    },

    getNextPaymentDates: function(results, limit) {
        return new Promise((resolve, reject) => {
            let upcoming = [];
            Object.keys(results).forEach(function(key) {
                let row = results[key];

                // If last_date is null, new recurring expense, push start date
                if (!row.last_date) {
                    let data = {amount: row.amount, description: row.description, next_date: lib.getFormattedDate(row.start_date)}
                    upcoming.push(data)
                }

                // Else play with frequencies
                else {
                    console.log('todo');
                }
            })
            resolve(upcoming);
        });
    },

    handleGetPayments: async function (userid, limit) {
        let recurringExpenseQuery = 'SELECT amount, description, start_date, end_date, last_date, frequency FROM recurrences WHERE userid = ? AND type  = ?';
        let values = [userid, 'expense'];

        // Returns a promise (fetchDB call)
        return lib.fetchFromDB(recurringExpenseQuery, values)
        .then(results => {
            // Parse results & return relevant data - return new promise 
            return this.getNextPaymentDates(results, limit)
        })
        .then(data => {
            return this.sortPaymentDates(data);
        })
    },

    fetchUpcomingPayments: async function (userid, limit) {
        return this.handleGetPayments(userid, limit)
    }
}