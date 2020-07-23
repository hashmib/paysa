const express = require('express');
const bodyParser = require('body-parser')


let app = express();
let router = express.Router();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', router);

function checkCredentials(req) {
	const correctCredentials = {
		username: "admin",
		password: "pass"
	}
	if (req.username == correctCredentials.username 
		&& req.password ==correctCredentials.password) {
		return true;
	} else {
		return false;
	}
}


router.post('/login', (req, res) => {
    console.log('Login Request Received')
    //console.log(req.body); //shows query paramters sent

    if(checkCredentials(req.body)) {
    	console.log("Login Successful")
    	res.send({"login-success": true});
    } else {
    	console.log("Login Failed")
    	res.send({"login-success": false});
    }

    //res.send("Hello!"); 
});
app.listen('8080', () => console.log('listening on 8080'));

