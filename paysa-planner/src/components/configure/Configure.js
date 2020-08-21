import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import React from 'react';
import NumberFormat from 'react-number-format';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
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
    monthlyIncome: '1320',
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
        </Container>
  );
}