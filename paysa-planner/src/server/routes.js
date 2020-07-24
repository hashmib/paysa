const routes = require('express').Router();

function checkCredentials(req) {
	const correctCredentials = {
		username: "admin",
		password: "pass"
	}
	return (req.username == correctCredentials.username 
		&& req.password ==correctCredentials.password);
}
routes.post('/login', (request, response) => {
    console.log('Login Request Received')
    if (checkCredentials(request)) {
        response.send({"auth": true});
    }
    else{
        response.send({"auth": false});
    }
});

module.exports = routes;