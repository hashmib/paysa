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
    transaction: {
      display: "flex",
      justifyContent: "space-between",
    },
    removeButton: {
      marginTop: theme.spacing(4),
    }
  }));

export default function AddTransaction(props) {
    const classes = useStyles();
    return (
        <Container component="main" maxWidth="md">
          <div className={classes.root}>
            <Typography variant="h6" component="h2" gutterBottom>
              Add your recurring earnings
            </Typography>
              {props.transactions.map((element, index) => (
                <div className={classes.transaction}>
                <RemoveCircleOutlineOutlinedIcon className={classes.removeButton} variant="contained" color="secondary" onClick={(event) => props.removeClick(element, index)}>
                  Remove {props.type}
                </RemoveCircleOutlineOutlinedIcon>
                  <TextField
                    label={props.type}
                    value={element.label}
                    onChange={(event) => props.handleChange(element, index, event)}
                    name="label"
                  />
                  <TextField
                    label="Amount"
                    value={element.value}
                    onChange={(event) => props.handleChange(element, index, event)}
                    name="value"
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
                    onChange={(event) => props.handleChange(element, index, {target:{name: "start", value: event}})}
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
                    onChange={(event) => props.handleChange(element, index, {target:{name: "end", value: event}})}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                    />
                  </MuiPickersUtilsProvider>
                  
                <FrequencySelect element={element} index={index} handleChange={props.handleChange} />
              </div>
            ))}   

              <Button variant="contained" color="primary" onClick={props.addClick}>
                Add {props.type}
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
        onValueChange={(transactions) => {
          onChange({
            target: {
              name: props.name,
              value: transactions.value,
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