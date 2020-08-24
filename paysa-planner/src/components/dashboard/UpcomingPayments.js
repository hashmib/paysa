import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Title from './Title';


const useStyles = makeStyles((theme) => ({}));

export default function UpcomingPayments() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Upcoming Payments</Title>
    </React.Fragment>
  );
}