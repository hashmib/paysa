import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import RemoveCircleOutlineOutlinedIcon from '@material-ui/icons/RemoveCircleOutlineOutlined';
import PropTypes from 'prop-types'
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import NumberFormat from 'react-number-format';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    root: {
      //width: '100%',
      '& > *': {
        margin: theme.spacing(1),
      },
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    // transaction: {
    //   display: "flex",
    //   // justifyContent: "space-between",
    // },
    // removeButton: {
    //   marginTop: theme.spacing(4),
    // },
    // formControl: {
    //     margin: theme.spacing(1),
    //     //minWidth: 120,
    //   },
  }));

  AddTransaction.propTypes = {
    transactions: PropTypes.array,
    add: PropTypes.func,
    remove: PropTypes.func,
    handleChange: PropTypes.func,
    type: PropTypes.string,
    recurring: PropTypes.bool
  }

  
export default function AddTransaction({
  transactions=[],
  add=null,
  remove=null,
  handleChange=null,
  type="Expense",
  recurring=false
}) {
    const classes = useStyles();
    let frequencies = ["One Time", "Weekly", "Biweekly", "Monthly"]
    if (recurring === true) { frequencies.shift() }
    return (
          <div className={classes.root}>
              {transactions.map((element, index) => (
                <div className={classes.transaction}>
                <RemoveCircleOutlineOutlinedIcon className={classes.removeButton} variant="contained" color="secondary" onClick={(event) => remove(element, index)}>
                  Remove {type}
                </RemoveCircleOutlineOutlinedIcon>
                  <TextField label={type}
                    value={element.label}
                    onChange={(event) => handleChange(element, index, event)}
                    name="label"
                  />
                  <TextField label="Amount"
                    value={element.value}
                    onChange={(event) => handleChange(element, index, event)}
                    name="value"
                    id="formatted-numberformat-input"
                    InputProps={{inputComponent: formattedAmount}}
                  />

                    <InputLabel id="demo-simple-select-label">Frequency</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={element.frequency}
                        name="frequency"
                        onChange={(event) => handleChange(element, index, event)}
                      >
                      {frequencies.map((freq) => {
                        return (<MenuItem value={freq}>{freq}</MenuItem>)
                      })}
                    </Select>

                {// TODO: fix onChange jugar in both below
                }

                {element.frequency!=="One Time" ? 
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
                    onChange={(event) => handleChange(element, index, {target:{name: "start", value: event}})}
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
                    onChange={(event) => handleChange(element, index, {target:{name: "end", value: event}})}
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

              <Button variant="contained" color="primary" onClick={add}>
                Add {type}
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