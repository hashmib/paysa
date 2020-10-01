import React, {useState, useCallback} from 'react';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import RemoveCircleOutlineOutlinedIcon from '@material-ui/icons/RemoveCircleOutlineOutlined';
import Typography from '@material-ui/core/Typography';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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
      // justifyContent: "space-between",
    },
    removeButton: {
      marginTop: theme.spacing(4),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
  }));

  export const useTransactionAdder = (initial) => {
    const [transactions, setTransactions] = useState(
      [{ value: "", label: "", start: new Date(), end: new Date(), frequency: ""}]
    );
    console.log(":::::---", transactions)
    return {
      transactions,
      setTransactions,
      addClick: setTransactions(transactions => (
          [...transactions, { value: "", label: "", start: new Date(), end: new Date(), frequency: "" }]
      )),
      removeClick: useCallback((element, index) => {
        let currentTransactions = [...transactions];
        currentTransactions.splice(index, 1);
        setTransactions(currentTransactions)
      }),
      handleChange: useCallback((element, index, event) => {
        let currentTransactions = [...transactions]
        currentTransactions[index] = { ...currentTransactions[index], [event.target.name]: event.target.value }
        setTransactions(currentTransactions)
      })
    }
  }

  
export default function AddTransaction(props) {
    const classes = useStyles();
    const base = useTransactionAdder(props.inital)
    console.log(":::", props.initial)
    let frequencies = ["One Time", "Weekly", "Biweekly", "Monthly"]
    if (props.recurring == true) { frequencies.shift() }
    return (
          <div className={classes.root}>
              {base.transactions.map((element, index) => (
                <div className={classes.transaction}>
                <RemoveCircleOutlineOutlinedIcon className={classes.removeButton} variant="contained" color="secondary" onClick={(event) => base.removeClick(element, index)}>
                  Remove {props.type}
                </RemoveCircleOutlineOutlinedIcon>
                  <TextField
                    label={props.type}
                    value={element.label}
                    onChange={(event) => base.handleChange(element, index, event)}
                    name="label"
                  />
                  <TextField
                    label="Amount"
                    value={element.value}
                    onChange={(event) => base.handleChange(element, index, event)}
                    name="value"
                    id="formatted-numberformat-input"
                    InputProps={{
                    inputComponent: formattedAmount,
                    }}
                  />
                  <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Frequency</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={element.frequency}
                        name="frequency"
                        onChange={(event) => base.handleChange(element, index, event)}
                      >
                      {frequencies.map((freq) => {
                        return (<MenuItem value={freq}>{freq}</MenuItem>)
                      })}
                    </Select>
                  </FormControl>
                {// TODO: fix onChange jugar in both below
                }

                {element.frequency!="One Time" ? 
                (
                
                  <div>

                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disablePast="true"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-dialog"
                    label="Start Date"
                    value={element.start}
                    name="start"
                    onChange={(event) => base.handleChange(element, index, {target:{name: "start", value: event}})}
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
                    onChange={(event) => base.handleChange(element, index, {target:{name: "end", value: event}})}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                    />
                  </MuiPickersUtilsProvider>
                  
                    </div>
                  ) 
                : (<div></div>)
                }







              </div>
            ))}   

              <Button variant="contained" color="primary" onClick={base.addClick}>
                Add {props.type}
              </Button>

          </div>
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