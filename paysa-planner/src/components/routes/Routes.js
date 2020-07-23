import React, {Fragment} from 'react';
import Login from "../login/Login"
import Register from "../register/Register"
import Forgot from "../forgot/Forgot"
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	withRouter
} from "react-router-dom";

const ReactRouter = () => {
	return (
		<Router>
				<Switch>
					<Route exact path="/login" component={withRouter(Login)} />
					<Route exact path="/register" component={withRouter(Register)} />
					<Route exact path="/forgot" component={withRouter(Forgot)} />
				</Switch>
		</Router>
	)
}

export default ReactRouter;