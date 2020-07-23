import React from 'react';
import '../css/App.css';
import Login from "./login/Login"
import Register from "./register/Register"
import Forgot from "./forgot/Forgot"

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <div className="App">
    	<Router>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/forgot" component={Forgot} />
        </Router>
    </div>
  );
}

export default App;
