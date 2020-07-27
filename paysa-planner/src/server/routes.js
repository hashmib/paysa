const routes = require('express').Router();
const lib = require('./library');


//todo: auth and user session + cookie
routes.post('/login', (request, response) => {
    console.log('Login Request Received')

    hashed_pwd = lib.getHashedPassword(request.body.password);

    if (lib.authenticateUser(request.body.username, hashed_pwd)) {
        response.json({
            status: 200,
            message: "User Authorized"
        });
    }
    else{
        response.json({
            status: 401,
            message: "Unauthorized"
        });
    }
});

routes.post('/register', (request, response) => {
    console.log('Registration request recieved')
    
    hashed_pwd = lib.getHashedPassword(request.body.password);
    created = lib.registerUser(request.body.username, hashed_pwd);

    console.log(created)
    
    if (created) response.json({
        status: 201,
        message: "New user created successfully"
    })
});

module.exports = routes;