import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import RemoveCircleOutlineOutlinedIcon from '@material-ui/icons/RemoveCircleOutlineOutlined';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React, {Fragment, useState} from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import NumberFormat from 'react-number-format';
import Grid from '@material-ui/core/Grid';
import { TextareaAutosize } from '@material-ui/core';
import axios from 'axios';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import StepIncome from './StepIncome'

//todo: everything should technically be under fields


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
  },
  income: {
    display: "flex",
    justifyContent: "space-between",
  },
  expense: {
    display: "flex",
    justifyContent: "space-between",
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  buttonRow: {
    maxWidth: "md",
    display: "flex",
    justifyContent: "space-between",
  },
  button: {
    minHeight: theme.spacing(6),
    width: '50%',
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  removeButton: {
    marginTop: theme.spacing(4),
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

function getSteps() {
  return ['Monthly Income', 'Expenses', 'Complete'];
}

export default function Configure(props) {
  const classes = useStyles();
  
  // <--------------------------- Monthly Income ---------------------->
  const [incomes, setIncomes] = useState(
    [{incomeValue: "", label: "", start: new Date(), end: new Date(), frequency: ""}]
  );
  const addIncomesClick = () => {
    setIncomes(incomes => (
    	[...incomes, { incomeValue: "", label: "", start: new Date(), end: new Date(), frequency: ""}]
    ))
  };
  const removeIncomesClick = (element, index) => {
    let currentIncomes = [...incomes];
    currentIncomes.splice(index, 1);
    setIncomes(currentIncomes)
  }
  const handleIncomesChange = (element, index, event) => {
    let currentIncomes = [...incomes]
    currentIncomes[index] = {...currentIncomes[index], [event.target.name]: event.target.value}
    setIncomes(currentIncomes)
  };


  //------------------------------------------------------------------->



  // <--------------------------- Expenses ---------------------------->

        /* Expected format of data
    [{
        expenseValue: 
        label:
        start:
        end:
        frequency:
    }]
    */

  const [expenses, setExpenses] = useState(
    [
      {expenseValue: "", 
      label: "", 
      start: new Date(), 
      end: new Date(), 
      frequency: ""}
    ]
  )
  const addExpensesClick = () => {
    setExpenses(expenses => (
    	[...expenses, { expenseValue: "", label: "", start: new Date(), end: new Date(), frequency: ""}]
    ))
  }

  const removeExpensesClick = (element, index) => {
    let currentExpenses = [...expenses];
    currentExpenses.splice(index, 1); // start at this element and remove 1
    setExpenses(currentExpenses)
  }

  const handleExpensesChange = (element, index, event) => {
    let currentExpenses = [...expenses]
    currentExpenses[index] = {...currentExpenses[index], [event.target.name]: event.target.value}
    setExpenses(currentExpenses)
  }
  
  const stepExpenses = () => {
    return (
        <Container component="main" maxWidth="md">
          <div className={classes.root}>
            <Typography variant="h6" component="h2" gutterBottom>
              Add your recurring expenses
            </Typography>
              {expenses.map((element, index) => (
                <div className={classes.expense}>
                <RemoveCircleOutlineOutlinedIcon className={classes.removeButton} variant="contained" color="secondary" onClick={(event) => removeExpensesClick(element, index)}>
                  Remove Expense
                </RemoveCircleOutlineOutlinedIcon>
                <TextField
                  label="Expense"
                  value={element.label}
                  onChange={(event) => handleExpensesChange(element, index, event)}
                  name="label"
                />
                <TextField
                  label="Amount"
                  value={element.expenseValue}
                  onChange={(event) => handleExpensesChange(element, index, event)}
                  name="expenseValue"
                  id="formatted-numberformat-input"
                  InputProps={{
                  inputComponent: formattedAmount,
                  }}
                />
              {// TODO: fix onChange jugar in both below
              }
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

              {frequencySelect(element, index, "expenses")}
                </div>
              ))}   

              <Button variant="contained" color="primary" onClick={addExpensesClick}>
                Add Expense
              </Button>

          </div>
        </Container>
      );
  }
  //------------------------------------------------------------------->



  //-------------------- Date Select ------------------------->
  const frequencySelect = (element, index, mode) => {
    const frequencies = ["Weekly", "Biweekly", "Monthly"]
    if (mode == "expenses") {
      return (
        <FormControl className={classes.formControl}>
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
    else {
      return (
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Frequency</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={element.frequency}
              name="frequency"
              onChange={(event) => handleIncomesChange(element, index, event)}
            >
            {frequencies.map((freq) => {
              return (<MenuItem value={freq}>{freq}</MenuItem>)
            })}
          </Select>
        </FormControl>
      );
    }

  }



//------------------------------------------------------------------->



  

  



  //-------------------- Stepper Functionality ------------------------->
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return(<StepIncome 
                  incomes={incomes}
                  addIncomesClick={addIncomesClick}
                  removeIncomesClick={removeIncomesClick}
                  handleIncomesChange={handleIncomesChange}
                />);
      case 1:
        return stepExpenses();
      case 2:
        return(<Typography className={classes.instructions}>
                  All steps completed - click finish to continue!
               </Typography>);
      default:
        return 'Unknown step';
    }
  }

  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  //------------------------------------------------------------------->



  const handleFinishAndRedirect = () => {
    axios.post('/configure', { incomes, expenses })
    .then((response) => {
      if(response.data.changesConfirmed) {
        props.history.push({
          pathname: '/index',
          //search: '?query=abc',p
          state: { incomes, expenses }
        })
      } else {
        alert("Configure failed, " + response.data.message);
      }}, 
    error => {
      console.log("configure error");
})
  }

  return (
    <Container component="main" maxWidth="lg">
    <CssBaseline />
    <div className={classes.root}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
          {handleFinishAndRedirect()}
          </div>
        ) : (
          <div>
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: '80vh' }}
          >
            <Grid item maxWidth="sm">
            {getStepContent(activeStep)}
            </Grid>   
          </Grid> 
            <div className={classes.buttonRow}>
              <Button 
              variant="contained"
              color="default"
              disabled={activeStep === 0} 
              onClick={handleBack} 
              className={classes.button}>
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
              >
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
    </Container>
  );
}