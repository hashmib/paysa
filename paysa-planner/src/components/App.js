import React from 'react';
import '../css/App.css';
import Login from "./login/Login"
import Register from "./register/Register"
import Forgot from "./forgot/Forgot"
import ReactRouter from './routes/Routes';
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles"; //this makes it dark mode

export default function App() {
	const darkTheme = createMuiTheme({
		palette: {
	      type: "dark" 
	  }
	});
  return (
    <div className="App">
     <ThemeProvider theme={darkTheme}>
    	<ReactRouter></ReactRouter>
    </ThemeProvider>
    </div>
  );
}
