import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      paddingBottom: "6px",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    transaction: {
        paddingTop: "0px",
        paddingBottom: "0px",
        borderWidth: "2px",
        borderStyle: "solid",
        borderColor: theme.palette.primary,
        borderRadius: "6px"
    }
  }));

  Transaction.propTypes = {
      amount: PropTypes.number,
      description: PropTypes.string,
      next_date: PropTypes.string
  }

export default function Transaction({
    amount = null,
    description = null,
    next_date = null,
}) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
        <List component="nav" aria-label="transaction" className={classes.transaction}>
          <ListItem button>
            <ListItemText secondary={next_date} />
            <ListItemText primary={description} />
            <AttachMoneyIcon></AttachMoneyIcon>
            <ListItemText primary={amount} />
          </ListItem>
        </List>
      </div>
    );
}