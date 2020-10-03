import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    payment: {
        borderWidth: "2px",
        borderStyle: "solid",
        borderColor: theme.palette.primary,
        borderRadius: "6px"
    }
  }));

  Payment.propTypes = {
      amount: PropTypes.number,
      description: PropTypes.string,
      next_date: PropTypes.string
  }

export default function Payment({
    amount = null,
    description = null,
    next_date = null,
}) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
        <List component="nav" aria-label="payment" className={classes.payment}>
          <ListItem button>
            <ListItemText primary={description} />
            <ListItemText secondary={amount} />
            <ListItemText secondary={next_date} />
          </ListItem>
        </List>
      </div>
    );
}