const routes = require('express').Router();
const cookieParser = require('cookie-parser');
const session = require("express-session");
const lib = require('./library');


// -------------------------------- cookie & session ---------------------------- //
// Initialize cookie-parser and session
routes.use(cookieParser());
routes.use(session({
    key: 'user_sid',
    secret: 'poplarstreet',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));

// Log out inactive user
routes.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');        
    }
    next();
});

// Check for logged-in users
var sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        res.status(200).json({logged_in: true})
    }
    else {
        res.status(200).json({logged_in: false})
    }
};

// -------------------------------- API Endpoints ---------------------------- //


routes.get('/login', (request, response) => {
    sessionChecker(request, response);
});

routes.get('/index', (request, response) => {
    sessionChecker(request, response);
});

 
routes.post('/login', (request, response) => {
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
        response.status(500).json("database issues")
    })
});


routes.post('/register', (request, response) => {    
    hashed_pwd = lib.getHashedPassword(request.body.password);
    
    lib.registerUser(request.body.username, hashed_pwd)
    .then(userAdded => {
        if (userAdded) {
            request.session.user = request.body.username;
            response.status(200).json({created: true, message: "registration success"})
        } else {
            response.status(200).json({created: false, message: "username already taken"})
    }}, error => {
        console.error("Failed!", error);
    })
});

routes.post('/logout', (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        res.clearCookie('user_sid');
        res.status(200).json({logged_out: true});
    }
});


routes.post('/configure', (req, res) => {
    console.log(req.body.data.expenses);
});

module.exports = routes;