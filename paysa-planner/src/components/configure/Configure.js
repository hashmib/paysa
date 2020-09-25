import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import React, { Fragment, useState } from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import 'date-fns';
import AddTransaction from './AddTransaction'

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
}));

function getSteps() {
  return ['Monthly Income', 'Expenses', 'Complete'];
};

export default function Configure(props) {
  const classes = useStyles();
  // <--------------------------- Monthly Income ---------------------->
  const [incomes, setIncomes] = useState(
    [{ value: "", label: "", start: new Date(), end: new Date(), frequency: "" }]
  );
  const addIncomesClick = () => {
    setIncomes(incomes => (
      [...incomes, { value: "", label: "", start: new Date(), end: new Date(), frequency: "" }]
    ))
  };
  const removeIncomesClick = (element, index) => {
    let currentIncomes = [...incomes];
    currentIncomes.splice(index, 1);
    setIncomes(currentIncomes)
  };
  const handleIncomesChange = (element, index, event) => {
    let currentIncomes = [...incomes]
    currentIncomes[index] = { ...currentIncomes[index], [event.target.name]: event.target.value }
    setIncomes(currentIncomes)
  };
  // <--------------------------- Expenses ---------------------------->
  const [expenses, setExpenses] = useState(
    [{ value: "", label: "", start: new Date(), end: new Date(), frequency: ""}]
  );
  const addExpensesClick = () => {
    setExpenses(expenses => (
      [...expenses, { value: "", label: "", start: new Date(), end: new Date(), frequency: "" }]
    ))
  };
  const removeExpensesClick = (element, index) => {
    let currentExpenses = [...expenses];
    currentExpenses.splice(index, 1);
    setExpenses(currentExpenses)
  };
  const handleExpensesChange = (element, index, event) => {
    let currentExpenses = [...expenses]
    currentExpenses[index] = { ...currentExpenses[index], [event.target.name]: event.target.value }
    setExpenses(currentExpenses)
  };
  //-------------------- Stepper Functionality ------------------------->
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (<AddTransaction
          transactions={incomes}
          addClick={addIncomesClick}
          removeClick={removeIncomesClick}
          handleChange={handleIncomesChange}
          type={"Income"}
        />);
      case 1:
        return (<AddTransaction
                  transactions={expenses}
                  addClick={addExpensesClick}
                  removeClick={removeExpensesClick}
                  handleChange={handleExpensesChange}
                  type={"Expense"}
                />);
      case 2:
        return (<Typography className={classes.instructions}>
          All steps completed - click finish to continue!
        </Typography>);
      default:
        return 'Unknown step';
    }
  };
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  //------------------------------------------------------------------->
  const handleFinishAndRedirect = () => {
    axios.post('/configure', { incomes, expenses })
      .then((response) => {
        if (response.data.changesConfirmed) {
          props.history.push({
            pathname: '/index',
            //search: '?query=abc',p
            state: { incomes, expenses }
          })
        } else {
          alert("Configure failed, " + response.data.message);
        }
      },
        error => {
          console.log("configure error");
        })
  };
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
          {activeStep === steps.length
            ? (<div>
                {handleFinishAndRedirect()}
              </div>)
            : (<div>
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
              </div>)}
        </div>
      </div>
    </Container>
  );
};