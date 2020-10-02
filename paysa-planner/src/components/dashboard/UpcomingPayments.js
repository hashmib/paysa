import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import axios from 'axios';


const useStyles = makeStyles((theme) => ({}));

export default function UpcomingPayments() {
  const classes = useStyles();

  axios.get('/upcomingpayments', {
    params: {
      sortBy: '30days'
    }
  })
  .then((response) => {
    console.log(response);
  })

  
  return (
    <div>
      Upcoming Payment
    </div>
  );
}