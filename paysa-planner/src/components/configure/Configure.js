import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React, {useState} from 'react';
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
}));

function formattedAmount(props) {
  const { inputRef, onChange, ...other } = props;
  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
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
  const [values, setValues] = useState({
    monthlyIncome: '',
  });

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const stepIncome = () => {
    return (
        <Container component="main" maxWidth="sm">
            <div className={classes.root}>
            <Typography variant="h6" component="h2" gutterBottom>
              Monthly Take Home
            </Typography>
            <TextField
                label="Monthly Income"
                value={values.monthlyIncome}
                onChange={handleChange}
                name="monthlyIncome"
                id="formatted-numberformat-input"
                InputProps={{
                inputComponent: formattedAmount,
                }}
            />
            </div>
        </Container>
      );
  }
  //------------------------------------------------------------------->



  // <--------------------------- Expenses ---------------------------->
  const [expenses, setExpenses] = useState(
    [{expenseValue: "", label: "", date: ""}]
  )
  const addClick = () => {
    setExpenses(expenses => (
    	[...expenses, { expenseValue: "", label: "", date: ""}]
    ))
  }
  const handleExpensesChange = (element, index, event) => {
    let currentExpenses = [...expenses]
    currentExpenses[index] = {...currentExpenses[index], [event.target.name]: event.target.value}
    setExpenses(currentExpenses)
  }
  
  const stepExpenses = () => {
    return (
        <Container component="main" maxWidth="sm">
            <div className={classes.root}>
          <Typography variant="h6" component="h2" gutterBottom>
            Add a recurring expense, and select frequency
          </Typography>
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
                value={element.expenseValue}
                onChange={(event) => handleExpensesChange(element, index, event)}
                name="expenseValue"
                id="formatted-numberformat-input"
                InputProps={{
                inputComponent: formattedAmount,
                }}
              />
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Date</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={element.date}
                  name="date"
                  onChange={(event) => handleExpensesChange(element, index, event)}
                >
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={6}>6</MenuItem>
                  <MenuItem value={7}>7</MenuItem>
                  <MenuItem value={8}>8</MenuItem>
                  <MenuItem value={9}>9</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={11}>11</MenuItem>
                  <MenuItem value={12}>12</MenuItem>
                  <MenuItem value={13}>13</MenuItem>
                  <MenuItem value={14}>14</MenuItem>
                  <MenuItem value={15}>15</MenuItem>
                  <MenuItem value={16}>16</MenuItem>
                  <MenuItem value={17}>17</MenuItem>
                  <MenuItem value={18}>18</MenuItem>
                  <MenuItem value={19}>19</MenuItem>
                  <MenuItem value={20}>20</MenuItem>
                  <MenuItem value={21}>21</MenuItem>
                  <MenuItem value={22}>22</MenuItem>
                  <MenuItem value={23}>23</MenuItem>
                  <MenuItem value={24}>24</MenuItem>
                  <MenuItem value={25}>25</MenuItem>
                  <MenuItem value={26}>26</MenuItem>
                  <MenuItem value={27}>27</MenuItem>
                  <MenuItem value={28}>28</MenuItem>
                </Select>
              </FormControl>
              </div>
            ))}   
            <Button variant="contained" color="primary" onClick={addClick}>
              Add Expense
            </Button>
            </div>
        </Container>
      );
  }
  //------------------------------------------------------------------->


  //-------------------- Stepper Functionality ------------------------->
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return stepIncome();
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
    var data = {}
    data["income"] = values;
    data["expenses"] = expenses;

    props.history.push("/configure");

    axios.post('/configure', { data })
    .then((response) => {
      if(response.data.added) {
        props.history.push("/index");
      } else {
        alert("Configure failed, " + response.data.message);
      }}, 
    error => {
      console.log("configure error");
})
  }

  return (
    <Container component="main" maxWidth="md">
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