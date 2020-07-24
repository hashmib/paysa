import React, {useState} from 'react'; //, useEffect, useSelector, useDispatch
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
  //BrowserRouter as Router,
  Switch,
  useHistory,
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

export default function Login() {

  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false)
  const [submitted, setSubmitted] = useState(false);
  const history = useHistory();
  
    //const loggingIn = useSelector(state => state.authentication.loggingIn);
    //const dispatch = useDispatch();

    // reset login status
    // useEffect(() => { 
    //     dispatch(userActions.logout()); 
    // }, []);

    

    function handleSubmit(e) {
        e.preventDefault();
        const inputs = username + " " + password
        //alert(inputs)
        console.log("monster")
        console.log(inputs)
        

        //todo: implement callback function when login successful, and add error handling for failure
        axios.post('/login', { username, password })
        .then((response) => {
          console.log(response)

          if (response.data.auth) {
            history.push("/home");
          }
        }, (error) => {
          console.log("no response received from server");
        });

        // setSubmitted(true);
        // if (username && password) {
        //     dispatch(userActions.login(username, password));
        // }
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