import React from 'react';
import '../css/App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "./dashboard/Dashboard";
import Forgot from "./forgot/Forgot";
import Login from "./login/Login";
import Register from "./register/Register";
import Configure from "./configure/Configure";
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
      <Router>
        <Switch>
          <Route path="/login" component={Login} /> 
          <Route path="/register" component={Register} />
          <Route path="/forgot" component={Forgot} />
          <Route path="/index" component={Dashboard} />
          <Route path="/configure" component={Configure} /> 
          <Route component={Dashboard} />
        </Switch>
      </Router>
    </ThemeProvider>
    </div>
  );
}
