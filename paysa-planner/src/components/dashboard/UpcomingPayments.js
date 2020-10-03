import { makeStyles } from '@material-ui/core/styles';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Payment from './Payment';


const useStyles = makeStyles((theme) => ({}));

export default function UpcomingPayments() {
  //const classes = useStyles();
  const [payments, setPayments] = useState([]);

  function getPayments() {
    console.log("hello")
    axios.get('/upcomingpayments', {params: {sortBy: '30days'}})
    .then((response) => {setPayments(response.data)})
  }
  
  useEffect(() => {
    getPayments()
  }, [])

  return (
    <div>
      Upcoming Payments
      {payments.map((payment) => (
        <Payment
          amount={payment.amount}
          description={payment.description}
          next_date={payment.next_date}
        />
      ))}
    </div>
  );
}