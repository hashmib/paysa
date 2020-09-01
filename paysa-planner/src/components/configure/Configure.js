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
  }
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
  return ['Monthly Income', 'Expenses', 'Step 3'];
}

export default function Configure() {
  const classes = useStyles();
  //stuff for step 1

  const [values, setValues] = useState({
    monthlyIncome: '',
  });
  const [fields, setFields] = useState(
    [{addedInput: "", label: ""}]
  )
  const addClick = () => {
    setFields(fields => (
    	[...fields, { addedInput: "", label: ""}]
    ))
  }
  const handleFieldsChange = (element, index, event) => {
    let currentFields = [...fields]
    currentFields[index] = {...currentFields[index], [event.target.name]: event.target.value}
    setFields(currentFields)
  }

  const handleChange = (event) => {
    console.log(event.target.value)
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const stepOneContent = () => {
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

  
  const stepTwoContent = () => {
    return (
        <Container component="main" maxWidth="sm">
            <div className={classes.root}>
          <Typography variant="h6" component="h2" gutterBottom>
            Expenses
          </Typography>
            {fields.map((element, index) => (
              <div className={classes.expense}>
              <TextField
                label="Expense"
                value={element.label}
                onChange={(event) => handleFieldsChange(element, index, event)}
                name="label"
              />
              <TextField
                label="Amount"
                value={element.addedInput}
                onChange={(event) => handleFieldsChange(element, index, event)}
                name="addedInput"
                id="formatted-numberformat-input"
                InputProps={{
                inputComponent: formattedAmount,
                }}
              />
              </div>
            ))}   
            <Button variant="contained" color="primary" onClick={addClick}>
              Add Expense
            </Button>
            </div>
        </Container>
      );
  }

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return stepOneContent();
      case 1:
        return stepTwoContent();
      case 2:
        return 'Step 3';
      default:
        return 'Unknown step';
    }
  }


  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    console.log(values);
    console.log(fields);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

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
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
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