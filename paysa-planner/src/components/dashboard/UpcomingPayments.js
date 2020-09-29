import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import axios from 'axios';


const useStyles = makeStyles((theme) => ({}));

export default function UpcomingPayments() {
  const classes = useStyles();

  axios.get('/upcomingtransactions')
  .then((response) => {
    console.log("YOYOYOY")
  });
  
  return (
    <div>
      Upcoming Payment
    </div>
  );
}