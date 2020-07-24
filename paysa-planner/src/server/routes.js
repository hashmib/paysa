const routes = require('express').Router();

function checkCredentials(req) {
	const correctCredentials = {
		username: "admin",
		password: "pass"
	}

    console.log("req.username: ", req.username)
    console.log("correct.username: ", correctCredentials.username)
    console.log("req.password: ", req.password)
    console.log("correct.password: ", correctCredentials.password)
    
	return (req.username == correctCredentials.username 
		&& req.password ==correctCredentials.password);
}
routes.post('/login', (request, response) => {
    console.log('Login Request Received')
    if (checkCredentials(request.body)) {
        response.send({"auth": true});
    }
    else{
        response.send({"auth": false});
    }
});

module.exports = routes;