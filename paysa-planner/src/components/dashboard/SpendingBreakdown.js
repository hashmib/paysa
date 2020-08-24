import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Title from './Title';


const useStyles = makeStyles((theme) => ({}));

export default function SpendingBreakdown() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Spending Breakdown</Title>
    </React.Fragment>
  );
}