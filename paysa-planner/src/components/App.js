import React from 'react';
import '../css/App.css';
import Login from "./login/Login"
import Register from "./register/Register"
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
        </Router>
    </div>
  );
}

export default App;
