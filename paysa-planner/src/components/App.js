import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Forgot from "./forgot/Forgot";
import Login from "./login/Login";
import Register from "./register/Register";
import Setup from "./setup/Setup";
import {AuthProvider} from "./common/AuthProvider";
import PrivateRoute from "./common/PrivateRoute"
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles"; //this makes it dark mode
import Dashboard from './dashboard/Dashboard';

export default function App() {
	const darkTheme = createMuiTheme({
		palette: {
	      type: "dark" 
	  }
	});
  return (
    <div className="App">
     <ThemeProvider theme={darkTheme}>
      <AuthProvider> 
        <Router>
          <Switch>
            <Route exact path="/login" component={Login} /> 
            <Route exact path="/register" component={Register} />
            <Route exact path="/forgot" component={Forgot} />
            <PrivateRoute exact path="/" component={Dashboard} theme={darkTheme}/>
            <Route path="/setup" component={Setup} /> 
          </Switch>
        </Router>
      </AuthProvider>
    </ThemeProvider>
    </div>
  );
}
