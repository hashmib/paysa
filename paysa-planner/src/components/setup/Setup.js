import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import 'date-fns';
import useTransactionAdder from '../addTransaction/useTransactionAdder';
import AddTransaction from '../addTransaction/AddTransaction'
import AddIncomes from './AddIncomes'
import {db} from "../../firebase/firebase"
// import { GlobalContext } from '../context/GlobalState';

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

  landing: {
      marginTop: '200px',
      display: 'tableCell',
      verticalAlign: 'middle',
      textAlign: 'center',
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
  const [incomes, addIncomesClick, removeIncomesClick, handleIncomesChange] = useTransactionAdder()
  // <--------------------------- Expenses ---------------------------->
  const [expenses, addExpensesClick, removeExpensesClick, handleExpensesChange] = useTransactionAdder()
  //-------------------- Stepper Functionality ------------------------->
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
        <AddIncomes
          transactions={incomes}
          add={addIncomesClick}
          remove={removeIncomesClick}
          handleChange={handleIncomesChange}
          type={"Income"}
        />
        );
      case 1:
        return (<AddIncomes
                  transactions={expenses}
                  add={addExpensesClick}
                  remove={removeExpensesClick}
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
    
    axios.post('/setup', { incomes, expenses })
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
{/* <div className={classes.landing}>
<Typography variant='h2'>Welcome to Paysa</Typography>
<br />
<Typography variant='h5'>Track your money. Plan better.</Typography>
<Typography variant='h5'>Save more.</Typography>
</div> */}