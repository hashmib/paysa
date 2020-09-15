import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Title from './Title';


const useStyles = makeStyles((theme) => ({}));

export default function OneTimePayment() {
  const classes = useStyles();
  return (
    <Button
      variant="contained"
      color="secondary"
      className={classes.button}
      startIcon={<CloudUploadIcon />}
    >
    Add Expense
  </Button>
  );
}