const express = require('express');
const bodyparser = require('body-parser');
const path = require('path')
const app = express();
 
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

app.get('/',(req,res)=>{
   
    res.sendFile(path.join(__dirname, "view", "singin.html"));
})

app.post('/user/sigin',(req,res)=>
{
    console.log(req.body);
})
app.listen(3000);