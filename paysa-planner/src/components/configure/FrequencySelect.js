import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import RemoveCircleOutlineOutlinedIcon from '@material-ui/icons/RemoveCircleOutlineOutlined';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  }));

export default function FrequencySelect(props) {
    const classes = useStyles();
    const frequencies = ["Weekly", "Biweekly", "Monthly"]
      return (
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Frequency</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={props.element.frequency}
              name="frequency"
              onChange={(event) => props.handleChange(props.element, props.index, event)}
            >
            {frequencies.map((freq) => {
              return (<MenuItem value={freq}>{freq}</MenuItem>)
            })}
          </Select>
        </FormControl>
      );
  }

