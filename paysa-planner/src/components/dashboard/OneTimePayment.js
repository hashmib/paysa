import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Title from './Title';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import React, {Fragment, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import { TextareaAutosize } from '@material-ui/core';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > *': {
      margin: theme.spacing(1),
    },
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
    expense: {
      display: "flex",
      justifyContent: "space-between",
    },
  }
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

  const [expenses, setExpenses] = useState(
    [
      {value: "", 
      label: "", 
      start: new Date(), 
      end: new Date(), 
      frequency: "One Time"}
    ]
  )
  
  const addExpensesClick = () => {
    setExpenses(expenses => (
      [...expenses, { value: "", label: "", start: new Date(), end: new Date(), frequency: ""}]
    ))
  }

  const handleExpensesChange = (element, index, event) => {
    let currentExpenses = [...expenses]
    currentExpenses[index] = {...currentExpenses[index], [event.target.name]: event.target.value}
    setExpenses(currentExpenses)
  }

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);  
  };

  //-------------------- Date Select ------------------------->
  const frequencySelect = (element, index) => {
    const frequencies = ["One Time", "Weekly", "Biweekly", "Monthly"]
    
    return (
      <FormControl>
        <InputLabel id="demo-simple-select-label">Frequency</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={element.frequency}
            name="frequency"
            onChange={(event) => handleExpensesChange(element, index, event)}
          >
          {frequencies.map((freq) => {
            return (<MenuItem value={freq}>{freq}</MenuItem>)
          })}
        </Select>
      </FormControl>
    );
  }
  //------------------------------------------------------------------->
  
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
      <Button
      variant="contained"
      color="secondary"
      className={classes.button}
      startIcon={<CloudUploadIcon />}
      onClick={handleClickOpen}
    >
    Add Expense
  </Button>
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Add Expense</DialogTitle>
      <DialogContent>
          <div className={classes.root}>
              {expenses.map((element, index) => (
                <div className={classes.expense}>
                  <TextField
                    label="Expense"
                    value={element.label}
                    onChange={(event) => handleExpensesChange(element, index, event)}
                    name="label"
                  />
                  <TextField
                    label="Amount"
                    value={element.value}
                    onChange={(event) => handleExpensesChange(element, index, event)}
                    name="value"
                    id="formatted-numberformat-input"
                    InputProps={{
                    inputComponent: formattedAmount,
                    }}
                  />
                {frequencySelect(element, index, handleExpensesChange)}
                {// TODO: fix onChange jugar in both below
                }
                {element.frequency != "One Time" ?
                (
                <div>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      disablePast="true"
                      format="MM/dd/yyyy"
                      margin="normal"
                      id="date-picker-inline"
                      label="Start Date"
                      value={element.start}
                      name="start"
                      onChange={(event) => handleExpensesChange(element, index, {target:{name: "start", value: event}})}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                  </MuiPickersUtilsProvider>
                  
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      minDate={element.start}
                      minDateMessage="Date should not be before start date"
                      format="MM/dd/yyyy"
                      margin="normal"
                      id="date-picker-inline"
                      label="Repeat Until"
                      value={element.end}
                      name="end"
                      onChange={(event) => handleExpensesChange(element, index, {target:{name: "end", value: event}})}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </div>
                ) :
                (<div></div>)}
              </div>
              ))}   

          </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleAddExpense} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
    </div>
  );
}