import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Title from './Title';


const useStyles = makeStyles((theme) => ({}));

export default function Activity() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
    </React.Fragment>
  );
}