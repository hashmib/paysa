import { makeStyles } from '@material-ui/core/styles';
import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import Transaction from './Transaction';


const useStyles = makeStyles((theme) => ({
  heading: {
    marginBottom: "8px",
  }
}));

export default function UpcomingTransactions() {
  const classes = useStyles();
  const [transactions, setTransactions] = useState([]);

  function getTransactions() {
    axios.get('/upcomingtransactions', {params: {sortBy: '30days'}})
    .then((response) => {setTransactions(response.data)})
  }

  function formatDate(date_string) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
    
    var d = new Date(date_string)
    let formattedDate = monthNames[d.getMonth()] + " " + d.getDate();

    return formattedDate;
  }
  
  useEffect(() => {
    getTransactions()
  }, [])

  return (
    <div>
      <Typography className={classes.heading} variant="h6" align="center">Upcoming Transactions</Typography>
      
      {transactions.map((transaction) => (
        <Transaction
          amount={transaction.amount}
          description={transaction.description}
          next_date={formatDate(transaction.next_date)}
        />
      ))}

    </div>
  );
}