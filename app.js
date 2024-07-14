const express = require('express');
const bodyparser = require('body-parser');
const path = require('path')
const bcrypt = require('bcrypt');

const dbconfig = require('./util/dbconfig');
const user = require('./module/user');

const singin = require('./router/singin')
const app = express();
 
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

app.use(express.static(path.join(__dirname,"public")));
app.use(express.static(path.join(__dirname,"view")));


app.use('/user/login',(req,res)=>
{
       console.log(req.body);
})
app.use('/user',singin);

app.get('/',(req,res)=>{
   
    res.sendFile(path.join(__dirname, "view", "login.html"));
})

dbconfig.sync();
app.listen(3000);