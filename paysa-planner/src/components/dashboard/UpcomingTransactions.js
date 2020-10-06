import { makeStyles } from '@material-ui/core/styles';
import React, { useState, useEffect } from 'react';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import Transaction from './Transaction';
import { formatDate } from '../utils';
import { numberWithCommas } from '../utils';



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
  
  useEffect(() => {
    getTransactions()
  }, [])

  return (
    <div>
      <Typography className={classes.heading} variant="h6" align="center">Upcoming Transactions</Typography>
      <Divider className={classes.heading} variant="middle" />
      {transactions.map((transaction) => (
        <Transaction
          amount={numberWithCommas(transaction.amount)}
          type={transaction.type}
          description={transaction.description.charAt(0).toUpperCase() + transaction.description.slice(1)}
          next_date={formatDate(transaction.next_date)}
        />
      ))}

    </div>
  );
}