import React, {useState, useEffect, useSelector, useDispatch} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link as RouteLink
} from "react-router-dom";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        PaySa
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Register() {

  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  
    //const loggingIn = useSelector(state => state.authentication.loggingIn);
    //const dispatch = useDispatch();

    // reset login status
    // useEffect(() => { 
    //     dispatch(userActions.logout()); 
    // }, []);

  
    function handleSubmit(e) {
        e.preventDefault();

        // setSubmitted(true);
        // if (username && password) {
        //     dispatch(userActions.login(username, password));
        // }

        // TODO: adeel, can you promisify this and do the history navigate to home page
        axios.post('/register', { username, password })
          .then((response) => {
            console.log(response.data.created)
          });
    }


    const classes = useStyles();




  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Create Account
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <TextField
            onChange={(e)=>setUsername(e.target.value)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            onChange={(e)=>setPassword(e.target.value)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Register
          </Button>
          <Grid container>
          <Grid item xs>
              <RouteLink to="/forgot">
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
              </RouteLink>
            </Grid>
            <Grid item>
            <RouteLink to="/login">
              <Link variant="body2">
                {"Already have an account? Login"}
              </Link>
            </RouteLink>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}