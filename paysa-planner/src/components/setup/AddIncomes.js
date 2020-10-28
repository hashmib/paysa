import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddTransaction from '../addTransaction/AddTransaction'
import RemoveCircleOutlineOutlinedIcon from '@material-ui/icons/RemoveCircleOutlineOutlined';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  accordionLineHolder: {
      marginLeft: theme.spacing(-4),
    display: "inline-block"
  },
  removeButton: {
    marginBottom: theme.spacing(1.5),
    marginRight: theme.spacing(1)
  },
  accordionLine: {
      display: "inline-block"
    // marginTop: theme.spacing(-4),
    // marginLeft: theme.spacing(3),
    // marginBottom: theme.spacing(2)
  }
}));

export default function AddIncomes({
    transactions = [],
    add = null,
    remove = null,
    handleChange = null,
    type = "Income",
    recurring = false
}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>

{transactions.map((element, index) => (
    <>
    <div className={classes.accordionLineHolder}>

    <RemoveCircleOutlineOutlinedIcon className={classes.removeButton} variant="contained" color="secondary" onClick={(event) => remove(element, index)}>
            Remove
        </RemoveCircleOutlineOutlinedIcon>
    <div className={classes.accordionLine}>

        
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>{element.label != "" ? element.label : type}</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <AddTransaction
                transactions={transactions}
                element={element}
                index={index}
                handleChange={handleChange}
                type={type}
                />
        </AccordionDetails>
      </Accordion>
        </div>
        </div>
        <br></br>
        </>
      ))}



      <Button variant="contained" color="primary" onClick={add}>
        Add {type}
      </Button>
    </div>
  );
}