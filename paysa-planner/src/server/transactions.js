const lib = require('./library');
const auth = require('./authenticate')
var async = require('async');


module.exports = {

    recordTransactions: async function() {
        auth.getUsersList()
        .then(users => {
            for (userid of users) {
                this.fetchUpcomingTransactions(userid, '1day', false)
                .then(upcoming => {
                    console.log("date today: \t " + lib.getFormattedDateToday());
                })
            }
        })
    },

    // Returns sorted array of upcoming transactions
    sortTransactionDates: function(data) {
        return new Promise((resolve, reject) => {
            resolve(data.sort(function(a,b) {
                return new Date(a.next_date) - new Date(b.next_date)
            }));
        })
    },


    computeNextTransactionDates: function(results, upcoming, endDateFromQuery) {
        Object.keys(results).forEach(function(key) {
            let row = results[key];
            let today = new Date();

            // If last_date is null, use start date as initial date
            if (!row.last_date) {
                if (row.start_date < endDateFromQuery && row.start_date >= today) {
                    
                    let data = {type: row.type, amount: row.amount, description: row.description, next_date: lib.getFormattedDate(row.start_date), rec_id: row.recurrence_id};
                    upcoming.push(data);
                    
                    let lastComputedDate = new Date(row.start_date);

                    if (row.frequency == "Weekly") {
                        lastComputedDate.setDate(lastComputedDate.getDate() + 7);
                        while (lastComputedDate < endDateFromQuery) {
                            // Push computed date to upcoming
                            let data = {type: row.type, amount: row.amount, description: row.description, next_date: lib.getFormattedDate(lastComputedDate), rec_id: row.recurrence_id};
                            upcoming.push(data);
                            lastComputedDate.setDate(lastComputedDate.getDate() + 7);
                        }
                    }
                    else if (row.frequency == "Biweekly") {
                        lastComputedDate.setDate(lastComputedDate.getDate() + 14);
                        while (lastComputedDate < endDateFromQuery) {
                            // Push computed date to upcoming
                            let data = {type: row.type, amount: row.amount, description: row.description, next_date: lib.getFormattedDate(lastComputedDate), rec_id: row.recurrence_id};
                            upcoming.push(data);
                            lastComputedDate.setDate(lastComputedDate.getDate() + 14);
                        }
                    }
                }
            }

            // Else play with frequencies
            else {
                let lastComputedDate = new Date(row.last_date);
                
                if (row.frequency == "Weekly") {
                    lastComputedDate.setDate(lastComputedDate.getDate() + 7);
                    while (lastComputedDate < endDateFromQuery) {
                        // Push computed date to upcoming
                        let data = {type: row.type, amount: row.amount, description: row.description, next_date: lib.getFormattedDate(lastComputedDate), rec_id: row.recurrence_id};
                        upcoming.push(data);
                        lastComputedDate.setDate(lastComputedDate.getDate() + 7);
                    }
                }
                else if (row.frequency == "Biweekly") {
                    lastComputedDate.setDate(lastComputedDate.getDate() + 14);
                    while (lastComputedDate < endDateFromQuery) {
                        // Push computed date to upcoming
                        let data = {type: row.type, amount: row.amount, description: row.description, next_date: lib.getFormattedDate(lastComputedDate), rec_id: row.recurrence_id};
                        upcoming.push(data);
                        lastComputedDate.setDate(lastComputedDate.getDate() + 14);
                    }
                }

                else if (row.frequency == "Monthly") {
                    lastComputedDate.setDate(lastComputedDate.getDate() + 30);
                    while (lastComputedDate < endDateFromQuery) {
                        // Push computed date to upcoming
                        let data = {type: row.type, amount: row.amount, description: row.description, next_date: lib.getFormattedDate(lastComputedDate), rec_id: row.recurrence_id};
                        upcoming.push(data);
                        lastComputedDate.setDate(lastComputedDate.getDate() + 30);
                    }
                }
            } // else
        }) // for loop
    },


    getNextTransactionDates: function(results, sortBy) {
        return new Promise((resolve, reject) => {
            let upcoming = [];
            let endDateFromQuery = new Date(); // initialize new data object

            if (sortBy == "30days") {
                // Sets an upper boundary of dates to compute until = 30 days from today
                endDateFromQuery.setDate(endDateFromQuery.getDate() + 30);
                this.computeNextTransactionDates(results, upcoming, endDateFromQuery);
            }

            else if (sortBy == "1day") {
                endDateFromQuery.setDate(endDateFromQuery.getDate() + 1);
                this.computeNextTransactionDates(results, upcoming, endDateFromQuery);
            }

            else if (sortBy == "7days") {
                endDateFromQuery.setDate(endDateFromQuery.getDate() + 7);
                this.computeNextTransactionDates(results, upcoming, endDateFromQuery);
            }
            resolve(upcoming);
        });
    },


    handleGetIncomes: async function(userid) {
        let recurringIncomesQuery = 'SELECT recurrence_id, amount, description, type, start_date, end_date, last_date, frequency FROM recurrences WHERE userid = ? AND type  = ?';
        let values = [userid, 'income'];

        // Returns a promise (fetchDB call)
        return lib.fetchFromDB(recurringIncomesQuery, values)
    },

    handleGetPayments: async function (userid) {
        let recurringExpenseQuery = 'SELECT recurrence_id, amount, description, type, start_date, end_date, last_date, frequency FROM recurrences WHERE userid = ? AND type  = ?';
        let values = [userid, 'expense'];

        // Returns a promise (fetchDB call)
        return lib.fetchFromDB(recurringExpenseQuery, values)
    },

    fetchUpcomingTransactions: async function (userid, sortBy, API) {
        expenses = this.handleGetPayments(userid)
        incomes = this.handleGetIncomes(userid)
    
        return Promise.all([expenses, incomes])
        
        .then(([expenseList, incomeList]) => {
            // Merges both arrays
            return (expenseList.concat(incomeList))
        })

        .then(merged => {
            // Parse results & return relevant data
            return this.getNextTransactionDates(merged, sortBy)
        })

        .then(data => {
            // Sort list before responding to client
            return this.sortTransactionDates(data);
        })

        .then(returnData => {
            // Remove unnecessary data in response to web client
            if (API) {
                for (tr of returnData) {
                    delete tr['rec_id'];
                }
                return returnData;
            }
            else {
                return returnData;
            }
        })
    },

}
