import { makeStyles } from '@material-ui/core/styles';
import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import Payment from './Payment';


const useStyles = makeStyles((theme) => ({
  heading: {
    marginBottom: "8px",
  }
}));

export default function UpcomingPayments() {
  const classes = useStyles();
  const [payments, setPayments] = useState([]);

  function getPayments() {
    axios.get('/upcomingpayments', {params: {sortBy: '30days'}})
    .then((response) => {setPayments(response.data)})
  }

  function formatDate(date_string) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
    
    var d = new Date(date_string)
    let formattedDate = monthNames[d.getMonth()] + " " + d.getDate();

    return formattedDate;
  }
  
  useEffect(() => {
    getPayments()
  }, [])

  return (
    <div>
      <Typography className={classes.heading} variant="h6" align="center">Upcoming Payments</Typography>
      
      {payments.map((payment) => (
        <Payment
          amount={payment.amount}
          description={payment.description}
          next_date={formatDate(payment.next_date)}
        />
      ))}

    </div>
  );
}