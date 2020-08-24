import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import React from 'react';
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
}));

function monthlyIncomeCustom(props) {
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

monthlyIncomeCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default function Configure() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    monthlyIncome: '2500',
    expenseName: '',
    expenseAmount: '1000',
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Container component="main" maxWidth="xs">
     <CssBaseline />
        <div className={classes.root}>
        <h1>Please enter your monthly take home</h1>
        <TextField
            label="Monthly Income"
            value={values.monthlyIncome}
            onChange={handleChange}
            name="monthlyIncome"
            id="formatted-numberformat-input"
            InputProps={{
            inputComponent: monthlyIncomeCustom,
            }}
        />
        </div>
        
        <br /> <br /> <br /> <br />
        <h2>Great! Add some expenses you think you'll be making every month. You can specify a start and end time to these!</h2>

        <div>
        <TextField
          id="outlined-multiline-flexible"
          label="Expense Name"
          multiline
          rowsMax={4}
          value={values.expenseName}
          onChange={handleChange}
          variant="outlined"
        />
        {' '}

        <TextField
            label="Expense Amount"
            value={values.expenseAmount}
            onChange={handleChange}
            name="expenseAmount"
            id="formatted-numberformat-input"
            InputProps={{
            inputComponent: monthlyIncomeCustom,
            }}
        /></div>
        <br />
        <Button variant="contained" color="primary">
          Add Expense
        </Button>
    </Container>
  );
}
