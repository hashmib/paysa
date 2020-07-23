import React from 'react';
import '../css/App.css';
import Login from "./login/Login"
import Register from "./register/Register"
import Forgot from "./forgot/Forgot"
import ReactRouter from './routes/Routes';

function App() {
  return (
    <div className="App">
    	<ReactRouter></ReactRouter>
    </div>
  );
}

export default App;
