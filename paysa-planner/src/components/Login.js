import React from 'react';
import Typography from '@material-ui/core/Typography';
import { TextField, Button } from '@material-ui/core';

function Login() {
  return (
    <div>
    <Typography variant="h4" component="h1" gutterBottom>
          Login 
    </Typography>
    <TextField
          id="outlined-username-input"
          label="Username"
          variant="outlined"
    />
    <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="outlined"
    />

    <Button variant="contained" color="primary">
      Login
    </Button>
    <Button variant="contained" color="secondary">
      Create Account
    </Button>
    </div>
  );
}

export default Login;
