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
    console.log('Registration recieved')
    console.log(request.body.username)
    hashed_pass = lib.getHashedPassword(request.body.password)
    console.log(hashed_pass)
});

module.exports = routes;