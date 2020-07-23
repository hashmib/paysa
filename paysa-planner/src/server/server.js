const express = require('express');
const bodyParser = require('body-parser')


let app = express();
let router = express.Router();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', router);

router.post('/login', (req, res) => {
    console.log('request received')
    console.log(req.body); //shows query paramters sent
    res.send("Hello!"); 
});
app.listen('8080', () => console.log('listening on 8080'));

