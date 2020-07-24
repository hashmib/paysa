import React from 'react';
import Login from "../login/Login"
import Register from "../register/Register"
import Forgot from "../forgot/Forgot"
import Home from "../home/Home"
import {
	BrowserRouter as Router,
	Switch,
	Route,
	withRouter
} from "react-router-dom";

const ReactRouter = () => {
	return (
		<Router>
				<Switch>
					<Route path="/login" component={withRouter(Login)} />
					<Route path="/register" component={withRouter(Register)} />
					<Route path="/forgot" component={withRouter(Forgot)} />
					<Route path="/home" component={withRouter(Home)} />
					//TODO: //<Route component={Error}/>
				</Switch>
		</Router>
	)
}

export default ReactRouter;