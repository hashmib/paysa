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
    .then(userID => {
        // Non-existent entry returns -1
        if (userID == -1) {
            response.status(200).json({authenticated : false})
        } else {
            request.session.user = userID;
            response.status(200).json({authenticated: true})
    }}, error => {
        console.error("Failed!", error);
        response.status(500).json("failed to return result from user database")
    })
});


routes.post('/register', (request, response) => {    
    hashed_pwd = lib.getHashedPassword(request.body.password);
    
    lib.registerUser(request.body.username, hashed_pwd)
    .then(newUserID => {
        if (newUserID == -1) {
            response.status(200).json({created: false, message: "username already taken"})
        } else {
            request.session.user = newUserID;
            response.status(200).json({created: true, message: "registration success"})
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

// TODO : SANITIZE DATA?
routes.post('/configure', (req, res) => {
    let income = req.body.data.income;
    let expenses = req.body.data.expenses;
    let userID = req.session.user;

    console.log(userID)
    console.log(income)
    console.log(expenses)

    lib.addUserTransaction(income, expenses, true)
});

module.exports = routes;