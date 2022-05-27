// from data base
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
	database : 'usersdb'
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
})
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
				response.redirect('/home');
			} else {
				response.send('Incorrect Username and/or Password!');
			}
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

app.get('/home', function(request, response) {
	if (request.session.loggedin) {
		response.send('Welcome back, ' + request.session.username + '!');
	} else {
		response.send('Please login to view this page!');
	}
	response.end();
});

            ///ADD A Requests///
app.post('/add/Requests', function (request, response) {


	let sql = "insert into Request (Date, patient_name, Blood_Group, Volume) values(?,?,?,?); ";
	await db.connection.execute(sql, [request.body.Date, request.body.patient_name, request.body.Blood_Group, request.body.Volume])
  
	let results = await db.connection.execute("SELECT * FROM requests;");
	console.log(results[0]);
  
	res.status(200).json(results[0]);
  })


          ///DELETE A Requests///
 app.delete('/delete/Requests/:name/:Group', function (request, response) {


	let sql = " DELETE FROM Requests where patient_name =? and Blood_Group =?";
	await db.connection.execute(sql, [ request.body.patient_name, request.body.Blood_Group])
	let results = await db.connection.execute("SELECT * FROM requests;");

	res.status(200).json(results[0]);
  })


        ///UPDATE A Requests///
		app.put('/updateRequests', function (request, response)  {

			let sql = "UPDATE Requests SET Date = ?, patient_name = ?, Blood_Group = ? WHERE Volume= ? ";
		  
			await db.connection.execute(sql, [request.body.Date, request.body.patient_name,request.body. Blood_Group, request.body. Volume])
		  
			let results = await db.connection.execute("SELECT * FROM Requests;")
			res.status(200).json(results[0]);
		  })


//app.listen(3000);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));