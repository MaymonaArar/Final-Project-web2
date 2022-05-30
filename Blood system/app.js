const mysql = require('mysql');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'blood_system'
});

app.use(session({
	secret: 'secret',
	resave: true,  
	saveUninitialized: true

	
}));
app.set('views', __dirname + '/views');
app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.get("/", function (req, res) {
	if (req.session.loggedin) {
		res.render('Home')
	}else{
		res.send("Please log in to view this page!")
	}
});


//Masa's
app.get('/Donors', function(request, response) {
	if (request.session.loggedin) {
		response.render('Donors')
	} else {
		response.send('Please login to view this page!');
	}
	
});

app.get('/bloodRequest', (req, res)=>{
	connection.query("SELECT * FROM requests", (error, result)=>{ 
		res.render('request', {result: result})
	})
})

app.get('/newRequest', (req, res)=>{
	res.render('newRequest')
})

app.post('/newRequest', (req, res)=>{
	connection.query("INSERT INTO `requests` (`Date`, `Patient_name`, `Blood_Group`, `Volume`) VALUES (?, ?, ?, ?)", [req.body.expiration, req.body.patName,req.body.bloodGroup,req.body.volume], (error)=>{
		if(error) throw error
		res.redirect('/bloodRequest');
	})
})

app.get('/delete/:reqId', (req, res)=>{
	connection.query("DELETE FROM `requests` WHERE (`idRequests` = ?)", [req.params.reqId], (error)=>{
		if(error)
			throw error
		res.redirect('/bloodRequest')
	})
})

app.get('/edit/:reqId', (req, res)=>{
	connection.query("SELECT * FROM `requests` WHERE idRequests = ?", [req.params.reqId], (error, result)=>{
		res.render('editRequest', {result: result[0]})
	})
})

app.post('/editRequest/:reqId', (req, res)=>{
	connection.query("UPDATE `requests` SET `Patient_name` = ?, `Blood_Group` = ?, `Volume` = ?  WHERE (`idRequests` = ?)", [req.body.patName, req.body.bloodGroup,req.body.volume, req.params.reqId], (error)=>{
		if(error)
			throw error
		res.redirect('/bloodRequest')
	})
})
//Masa's ends



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
