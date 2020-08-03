const routes = require('express').Router();
const lib = require('./library');


//todo: auth and user session + cookie
routes.post('/login', (request, response) => {
    console.log('login req received')

    hashed_pwd = lib.getHashedPassword(request.body.password);

    lib.authenticateUser(request.body.username, hashed_pwd)
    .then(auth => {
        if (auth) {
            response.status(200).json({authenticated : true})
        } else {
            response.status(401).json({authenticated: false})
    }}, error => {
        console.error("Failed!", error);
    })
});

routes.post('/register', (request, response) => {
    console.log('registration request received')
    
    hashed_pwd = lib.getHashedPassword(request.body.password);
    
    lib.registerUser(request.body.username, hashed_pwd)
    .then(auth => {
        if (auth) {
            response.status(200).json({created: true, message: "registration success"})
        } else {
            response.status(400).json({created: false, message: "username already taken"})
    }}, error => {
        console.error("Failed!", error);
    })
});

module.exports = routes;