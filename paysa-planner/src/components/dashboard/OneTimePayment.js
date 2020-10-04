import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import React from 'react';
import 'date-fns';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import axios from 'axios';
import AddTransaction from '../addTransaction/AddTransaction';
import useTransactionAdder from '../addTransaction/useTransactionAdder';
// import { GlobalContext } from '../context/GlobalState';


const useStyles = makeStyles((theme) => ({
  root: {
    // width: '100%',
    // '& > *': {
    //   margin: theme.spacing(1),
    // },
    // '& .MuiTextField-root': {
    //   margin: theme.spacing(1),
    //   width: '100%',
    // },
    // expense: {
    //   display: "flex",
    //   justifyContent: "space-between",
    // },
  },
  expense: {
    // display: "flex",
    // justifyContent: "space-between",
  },
}));

function formattedAmount(props) {
  const { inputRef, onChange, ...other } = props;
  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(incomes) => {
        onChange({
          target: {
            name: props.name,
            value: incomes.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix="$"
    />
  );
}

formattedAmount.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default function OneTimePayment() {
  // <--------------------------- Expenses ---------------------------->
  const [expenses, addExpensesClick, removeExpensesClick, handleExpensesChange] = useTransactionAdder()

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);  
  };
  
  const handleAddExpense = () => {
    axios.post('/addexpense', { expenses })
    .then((response) => {
      if(response.data.changesConfirmed) {
        setOpen(false);
      } 
      else {
        alert("Configure failed, " + response.data.message);
      }}, 
    error => {
      console.log("configure error");
    })
  }
  const classes = useStyles();

  return (
    <div>
      {/* <Button
      variant="contained"
      color="secondary"
      className={classes.button}
      startIcon={<CloudUploadIcon />}
      onClick={handleClickOpen}
    >
    Add Expense
  </Button>
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth="lg">
      <DialogTitle id="form-dialog-title">Add Expense</DialogTitle>
      <DialogContent> */}
          <AddTransaction
                  transactions={expenses}
                  add={addExpensesClick}
                  remove={removeExpensesClick}
                  handleChange={handleExpensesChange}
                  type={"Expense"}
            />
      {/* </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleAddExpense} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog> */}
    </div>
  );
}