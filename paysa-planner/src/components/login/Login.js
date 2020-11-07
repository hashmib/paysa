import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link as RouteLink } from "react-router-dom";
import {auth} from '../../firebase/firebase'

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

export default function Login (props)  {
  const classes = useStyles();

  //-------------------- Hooks ------------------------->
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false)
  //---------------------------------------------------->

    // useEffect(() => {
    //   axios.get('/login', {})
    //   .then((response) => {
    //     if (response.data.logged_in) {
    //       props.history.push("/home");
    //     }
    //   }, (error) => { // will be called when server sends 500 response
    //       console.log("error connecting to server");
    //       alert("Server error. Please refresh!")
    //   });
    // })

    function handleSubmit(e) {
        e.preventDefault();
        auth.signInWithEmailAndPassword(username, password)
        .then(() => {
          props.history.push("/index");
        })
        .catch((error) => alert(error.message))
        // axios.post('/login', { username, password })
        // .then((response) => {
        //   if(response.data.authenticated) {
        //     props.history.push("/index");
        //   }
        //   else {
        //     alert("Sorry that user name password combo doesnt exist.")
        //   }
        // }, (error) => { 
        //     console.log("unauthorized");
        // });
    }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
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
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
            onChange={(e)=>setRemember(e.target.checked)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <RouteLink to="/forgot">
              <Link variant="body2">
                Forgot password?
              </Link>
              </RouteLink>
            </Grid>
            <Grid item>
            <RouteLink to="/register">
              <Link variant="body2">
                {"Don't have an account? Sign Up"}
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
