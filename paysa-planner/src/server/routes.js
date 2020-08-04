const routes = require('express').Router();
var cookieParser = require('cookie-parser');
const session = require("express-session");
const lib = require('./library');

// initialize cookie-parser to allow us access the cookies stored in the browser. 
routes.use(cookieParser());

// Express Sessions
routes.use(session({
    key: 'user_sid',
    secret: 'poplarstreet',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));

// Check if user cookie still saved in browser and user is not set, then automatically log the user out.
routes.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');        
    }
    next();
});

// Check for logged-in users
var sessionChecker = (req, res, next) => {
    console.log("yo")
    if (req.session.user && req.cookies.user_sid) {
        res.redirect('/home');
    } else {
        next();
    }    
};

routes.get('/login', sessionChecker, (request, response));
 
routes.post('/login', (request, response) => {
    console.log('login req received')

    hashed_pwd = lib.getHashedPassword(request.body.password);

    lib.authenticateUser(request.body.username, hashed_pwd)
    .then(auth => {
        if (auth) {
            request.session.user = request.body.username;
            response.status(200).json({authenticated : true})
        } else {
            response.status(200).json({authenticated: false})
    }}, error => {
        console.error("Failed!", error);
    })
});


routes.post('/register', (request, response) => {
    console.log('registration request received')
    
    hashed_pwd = lib.getHashedPassword(request.body.password);
    
    lib.registerUser(request.body.username, hashed_pwd)
    .then(userAdded => {
        if (userAdded) {
            response.status(200).json({created: true, message: "registration success"})
        } else {
            response.status(200).json({created: false, message: "username already taken"})
    }}, error => {
        console.error("Failed!", error);
    })
});

routes.post('/logout', (request, response) => {
    if (req.session.user && req.cookies.user_sid) {
        res.clearCookie('user_sid');
    } else {
        res.redirect('/login');
    }
});

module.exports = routes;