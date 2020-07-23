import React from 'react';  
import Button from '@material-ui/core/Button';  
import TextField from '@material-ui/core/TextField';  
import Grid from '@material-ui/core/Grid';  
import Typography from '@material-ui/core/Typography';  

class Register extends React.Component {  
   handleRegister = () => {  
   alert("HANDLE REGISTER FUNCTION");  
}  
render() {  
   return (  
      <Grid  
         container  
         spacing={0}  
         direction="column"  
         alignItems="center"  
         justify="center"  
         style={{ minHeight: '100vh' }}  
         >  
   <Typography component="h1" variant="h5">  
      Register  
   </Typography>  
   <form onSubmit={this.handleRegister}>  
   <TextField  
      variant="outlined"  
      margin="normal"  
      fullWidth  
      label="Email Address"  
   />  
   <TextField  
      variant="outlined"  
      margin="normal"  
      fullWidth  
      label="Password"  
      type="password"  
   />  
   <Button  
      type="submit"  
      fullWidth  
      variant="contained"  
      color="primary"  
      >  
      Create Account  
      </Button>  
   </form>  
  </Grid>  
  );  
 }    
}  
export default Register; 