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

const useStyles = makeStyles((theme) => ({
  root: {
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

function Step1() {
  const classes = useStyles();

  const [values, setValues] = useState({
    monthlyIncome: '2500',
    //expenseName: '',
    //expenseAmount: '1000',
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
    console.log("hello")
    console.log(event.target.value)
    let currentFields = [...fields]
    console.log(fields)
    console.log(index)
    currentFields[index] = {...currentFields[index], [event.target.name]: event.target.value}
    setFields(currentFields)
  }

  const handleChange = (event) => {
    console.log(event.target.value)
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  return (
    <Container component="main" maxWidth="xs">
     <CssBaseline />
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
        <br />
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

function getSteps() {
  return ['Monthly Income + Expenses', 'Step2', 'Step3'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return Step1();
    case 1:
      return 'Step 2';
    case 2:
      return 'Step 3';
    default:
      return 'Unknown step';
  }
}

export default function Configure() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const steps = getSteps();

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = <Typography variant="caption">Optional</Typography>;
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
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
            <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
            <div>
              <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                Back
              </Button>
              {isStepOptional(activeStep) && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSkip}
                  className={classes.button}
                >
                  Skip
                </Button>
              )}

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
  );
}