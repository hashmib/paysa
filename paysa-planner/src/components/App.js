import React from 'react';
import '../css/App.css';
import Login from "./login/Login"
import Register from "./register/Register"
import Forgot from "./forgot/Forgot"
import ReactRouter from './routes/Routes';

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles"; //this makes it dark mode

// THIS IS THE APP COMPONENT
// BASICALLY THIS IS THE WHOLE APP

// AND IT ONLY JUST CONTAINS THE REACT ROUTER
// WHICH IS BASICALLY THE WHOLE APP


// SO INDEX.HTML CONTAINS APP WHICH CONTAINS REACT ROUTER
// EVERYTHING ELSE IN OUR APP IS CONTAINED WITHIN REACT ROUTER

function App() {

	const darkTheme = createMuiTheme({
	    palette: {
	      type: "dark",
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

export default App;
