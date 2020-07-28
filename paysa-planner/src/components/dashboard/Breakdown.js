import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
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