const routes = require('express').Router();
const lib = require('./library');


//todo: auth and user session + cookie
routes.post('/login', (request, response) => {
    console.log('Login Request Received')
    if (lib.authenticateUser(request.body)) {
        response.send({"auth": true});
    }
    else{
        response.send({"auth": false});
    }
});

routes.post('/register', (request, response) => {
    console.log('Registration request recieved')
    
});

module.exports = routes;