import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({});

export default function Breakdown() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Spending Breakdown</Title>
    </React.Fragment>
  );
}