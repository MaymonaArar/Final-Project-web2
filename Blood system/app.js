const mysql = require('mysql');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '12345',
	database : 'blood_system'
});

app.use(session({
	secret: 'secret',
	resave: true,  
	saveUninitialized: true

	
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());


//app.use(express.static(__dirname + 'public'))

//console.log("Server Started");

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/"+"views/Login.html");
});
app.get('/styles/Login.css', function(req, res) {
	res.sendFile(__dirname + "/" + "styles/Login.css");
});
app.use('/images', express.static('images'));

app.get('/ChangePass.html', function(req, res) {
	res.sendFile(__dirname + "/" + "ChangePass.html");
});


  app.post('/login', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		connection.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			
			if (results ?.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				response.redirect('/Home');
				
			} else {
				//response.send('Incorrect Username and/or Password!');
				response.redirect('/');
				
				
			}
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

app.post('/Donors', function(request, response) {
	
		response.redirect('/');
		
});

app.get('/Home', function(request, response) {
	if (request.session.loggedin) {
		//response.render("/views/Home.html");
		response.sendFile(__dirname + "/"+"views/Home.html");
	
	} else {
		response.send('Please login to view this page!');
	}
	
});
app.get('/Donors', function(request, response) {
	if (request.session.loggedin) {
		
		response.sendFile(__dirname + "/"+"views/Donors.html");
	
	} else {
		response.send('Please login to view this page!');
	}
	
});
app.get('/blood', function(request, response){
	connection.query('SELECT `Blood_amount` FROM `blood`', function (error, results) {
		if (error) {
			console.log(error);
		}
		res.send(results);
	});
});

app.get('/logout',(req,res) => {
    req.session.destroy();
    res.redirect('/');
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));