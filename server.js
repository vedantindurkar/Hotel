const express = require("express");
const app = express();
const db=require('./db');

const bodyParser=require('body-parser');
app.use(bodyParser.json());


const menuItem= require('./models/menuItem');

//get can only give you response ntg else

app.get("/", function (req, res) {
  res.send("Welcome to  Vedant");
});



const personroutes = require('./routes/personroutes');
const menuroutes = require('./routes/menuroutes');

app.use('/person',personroutes);
app.use("/menu", menuroutes);

    
app.listen(5000,()=>{
    console.log("server is live on 5000");
});