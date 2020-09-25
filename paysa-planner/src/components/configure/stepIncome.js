import React from 'react';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import RemoveCircleOutlineOutlinedIcon from '@material-ui/icons/RemoveCircleOutlineOutlined';
import Typography from '@material-ui/core/Typography';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import FrequencySelect from './FrequencySelect'
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

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
    removeButton: {
      marginTop: theme.spacing(4),
    }
  }));

export default function StepIncome(props) {
    const classes = useStyles();
    return (
        <Container component="main" maxWidth="md">
          <div className={classes.root}>
            <Typography variant="h6" component="h2" gutterBottom>
              Add your recurring earnings
            </Typography>
              {props.incomes.map((element, index) => (
                <div className={classes.income}>
                <RemoveCircleOutlineOutlinedIcon className={classes.removeButton} variant="contained" color="secondary" onClick={(event) => props.removeIncomesClick(element, index)}>
                  Remove Income
                </RemoveCircleOutlineOutlinedIcon>
                  <TextField
                    label="Earning"
                    value={element.label}
                    onChange={(event) => props.handleIncomesChange(element, index, event)}
                    name="label"
                  />
                  <TextField
                    label="Amount"
                    value={element.incomeValue}
                    onChange={(event) => props.handleIncomesChange(element, index, event)}
                    name="incomeValue"
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
                    id="date-picker-dialog"
                    label="Start Date"
                    value={element.start}
                    name="start"
                    onChange={(event) => props.handleIncomesChange(element, index, {target:{name: "start", value: event}})}
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
                    id="date-picker-dialog"
                    label="Repeat Until"
                    value={element.end}
                    name="end"
                    onChange={(event) => props.handleIncomesChange(element, index, {target:{name: "end", value: event}})}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                    />
                  </MuiPickersUtilsProvider>
                  
                <FrequencySelect element={element} index={index} handleChange={props.handleIncomesChange} />
              </div>
            ))}   

              <Button variant="contained" color="primary" onClick={props.addIncomesClick}>
                Add Income
              </Button>

          </div>
        </Container>
      );
  }

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