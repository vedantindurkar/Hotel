const express = require("express");
const app = express();
const db=require('./db');
require('dotenv').config();

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Person = require('./models/person');

const bodyParser=require('body-parser');
app.use(bodyParser.json());
const PORT=process.env.PORT || 5000;

//middleware defined
const logRequest =(req,res,next)=>{
  console.log(`[${new Date().toLocaleString()}]Request Made to :${req.originalUrl}`);
  next();
}

app.use(logRequest);

const menuItem= require('./models/menuItem');

passport.use(new LocalStrategy(async (USERNAME,PASSWORD,done)=>{
  //authentication logic
  try {
    console.log("received credentials:", USERNAME, PASSWORD);
    const user = Person.findOne({ username: USERNAME });
    if (!user) return done(null, false, { message: "Incorrect Username" });

    const ispassmatch = user.passport === PASSWORD ? true : false;
    if (ispassmatch) {
      return done(null, user);
    } else {
      return done(null, false, { message: "Incorrect password" });
    }
  } catch (err) {
    return done(err);
  }
}));

//get can only give you response ntg else

app.get("/",function (req, res) {
  res.send("Welcome to My Website!Thank you for visiting.");
});



const personroutes = require('./routes/personroutes');
const menuroutes = require('./routes/menuroutes');

app.use('/person',personroutes);
app.use("/menu", menuroutes);

    
app.listen(5000,()=>{
    console.log("server is live on 5000");
});