import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Title from './Title';


const useStyles = makeStyles((theme) => ({}));

export default function MonthInReview() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Month In Review</Title>
    </React.Fragment>
  );
}