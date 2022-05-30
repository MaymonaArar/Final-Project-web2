const express = require ('express');
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: false}))

let user = {
    id :" ",
    email : " ",
    password : " "
}

app.get('/',(req,res)=>{
    res.send('Hello')
})


app.get('/forgot-password',(req,res,next)=>{
    res.render('forgot-password');
})
app.post('/forgot-password',(req,res,next)=>{
    const {email} = req.body;
    res.send(email);

    if(email !== user.email){
        res.send('Not registered');
        return;
    }
})

app.listen(3000,()=>console.log('http://localhost:3000'))
