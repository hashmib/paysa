import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Index from "./index/Index"
import Forgot from "./forgot/Forgot";
import Login from "./login/Login";
import Register from "./register/Register";
import Setup from "./setup/Setup";
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
          <Route path="/index" component={Index} theme={darkTheme}/>
          <Route path="/setup" component={Setup} /> 
          <Route component={Index} />
        </Switch>
      </Router>
    </ThemeProvider>
    </div>
  );
}
