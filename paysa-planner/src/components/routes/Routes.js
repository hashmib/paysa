import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import Forgot from "../forgot/Forgot";
import Login from "../login/Login";
import Register from "../register/Register";

const ReactRouter = () => {
	return (
		<Router>
			<Switch>
				<Route path="/login" component={Login} /> 
				<Route path="/register" component={Register} />
				<Route path="/forgot" component={Forgot} />
				<Route path="/index" component={Dashboard} />
				<Route component={Dashboard} />
			</Switch>
		</Router>
	)
}

export default ReactRouter;