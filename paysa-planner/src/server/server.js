// Sets up the express server and middleware
const app = require('express')();
const trans = require('./transactions')
const routes = require('./routes');
const cors = require('cors');
const bodyParser = require('body-parser')

// Import and connect db
const mysql = require('./connectdb')

// To format in JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect all our routes to our application
app.use('/', routes);

// Listen to incoming HTTP requests on port 8080
app.listen('8080', () => console.log('listening on 8080'));