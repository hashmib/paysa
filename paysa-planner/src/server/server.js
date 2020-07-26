// Sets up the express server and database
const app = require('express')();
const routes = require('./routes');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

// Set up DB
require('dotenv').config()
mongoose.connect(process.env.USERDATABASE_URL, { useNewUrlParser: true})
const db = mongoose.connection

// Check DB connected
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to user database'))

// To format in JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect all our routes to our application
app.use('/', routes);

// Listen to incoming HTTP requests on port 8080
app.listen('8080', () => console.log('listening on 8080'));
