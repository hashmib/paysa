const lib = require('./library');
var async = require('async');


module.exports = {
    /* high level thinking
    
    return next 10 for now, will probably take some arg -> limit 
    perhaps implement with infinite scroll later for the component

    1. for all recurrences where last date = NULL
            if limit is 10, then fetch all startDates in this month and next month


    2. 

    */

    getRecurringExpenses: async function (userid) {
        console.log(userid)
        let type = "expense"
        let recurringExpenseQuery = "SELECT amount, description, start_date, end_date, last_date, frequency FROM recurrences WHERE userid = ?";
        let values = [
            userid,
            type
        ];
        const expenses = lib.fetchFromDB(recurringExpenseQuery, values);
        expenses.then(results => {
            console.log(results);
        })


    },

    returnSortedPayments: async function (userid) {
        const handler = this.getRecurringExpenses(userid);
        handler.then(promiseArray => {
            console.log(promiseArray);
        })

        return handler;
    },


    fetchUpcomingPayments: async function (userid) {
        console.log("in payments service")
        const result = this.returnSortedPayments(userid);
        result.then(upcoming => {
            console.log(upcoming);
        })
        return result;
    }
}