const express = require('express');
const router = express.Router();
const app = express();
const httpApp = express();
//const port = 3000
const bodyParser = require('body-parser'); 

module.exports = router;

app.get('/users',(req,res)=>{
    res.status(200).json(users);
})

app.post('/users',(req,res)=>{
    res.send('');


    res.status(201).json() 
})
app.delete('/users',(req,res)=>{
    let requestBody = req.body;
    '/users'.push(requestBody);
})
app.put('/users',(req,res)=>{
    
})

router.get('/users',(req,res)=>{
    res.send('');
})
router.post('/users',(req,res)=>{
    res.send('');
})


app.listen(port,()=>{
    console.log('listening at http://localhost:$(3000)')
})



const db = require('./db');

httpApp.get('/users',async(request,response)=>{
    let result = await db.connection.execute('SELECT *FROM Users') 
    
    res.status(200).json(result)
})
httpApp.listen(3000,()=>{
    console.log('server is running on port ${3000}');
})

