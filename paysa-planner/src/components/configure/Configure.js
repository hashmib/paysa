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

// const createExpenseField = (index, handleExpenseChange) => {    
//   return (
//     <div>
//     <TextField
//       id="standard-basic"
//       label="Expense Name"
//       name="expenseName"
//       //multiline
//       rowsMax={4}
//       //value={expenseName}
//       onChange={handleExpenseChange}
//     />
//     {' '}

//     <TextField
//         label="Expense Amount"
//         //value={expenseAmount}
//         onChange={handleExpenseChange}
//         name="expenseAmount"
//         id="formatted-numberformat-input"
//         InputProps={{
//         inputComponent: formattedAmount,
//         }}
//     />
//   </div>
//   )
// }


export default function Configure() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    monthlyIncome: '2500',
    //expenseName: '',
    //expenseAmount: '1000',
  });
  const [fields, setFields] = React.useState({
    inputs: [{addedInput: ""}]

  })

  

  // const [expenses, setExpenses] = React.useState(
  //   [
  //     {name:  '',
  //     amount: ''}
  //       ,]
  // )

  const addClick = () => {
    setFields(fields => ({ 
    	inputs: [...fields.inputs, { addedInput: ""}]
    }))
  }

  const handleFieldsChange = (i, e) => {
    let currentFields = [...fields.inputs]
    currentFields[i] = {...currentFields[i], ["addedInput"]: e.target.value}
    setFields({inputs: currentFields})
  }

  const renderInputFields = () => {
    return (
      fields.inputs.map((element, index) => (
      <TextField
        label="Expense Amount"
        value={element.addedInput}
        onChange={handleFieldsChange(index)}
        name="addedInput"
        id="formatted-numberformat-input"
        InputProps={{
        inputComponent: formattedAmount,
        }}
    />
     ))
     )
  }
  

  const handleChange = (event) => {
    console.log(event.target.value)
    setValues({ ...values, [event.target.name]: event.target.value });
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
            inputComponent: formattedAmount,
            }}
        />
        </div>
        
        <br /> <br /> <br /> <br />
        <h2>Great! Add some expenses you think you'll be making every month. You can specify a start and end time to these!</h2>

           {renderInputFields()}
             
        <br />
        <Button variant="contained" color="primary" onClick={addClick}>
          Add Expense
        </Button>
    </Container>
  );
}
