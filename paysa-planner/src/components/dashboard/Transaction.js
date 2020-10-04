import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      paddingBottom: "6px",
      backgroundColor: theme.palette.background.paper,
    },
    transaction: {
        paddingTop: "0px",
        paddingBottom: "0px",
        backgroundColor: props => props.type === "income" ? theme.palette.success.dark : theme.palette.error.dark,
        borderWidth: "2px",
        borderStyle: "solid",
        borderColor: theme.palette.background.default,
        borderRadius: "6px",
        display: "flex",
        justifyContent: "space-between"
    },
  }));

  Transaction.propTypes = {
      amount: PropTypes.string,
      type: PropTypes.string,
      description: PropTypes.string,
      next_date: PropTypes.string
  }

export default function Transaction({
    amount = null,
    description = null,
    next_date = null,
    ...props
}) {
    const classes = useStyles(props);
    return (
      <div className={classes.root}>
        <List component="nav" aria-label="transaction" className={classes.transaction}>
          <ListItem button>
            <ListItemText secondary={next_date} />
              <ListItemText primary={description} />
            
            <div style={{ display: "inline-flex" }}>
              <ListItemText primary={"$" + amount} />
            </div>
          </ListItem>
        </List>
      </div>
    );
}

