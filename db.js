//to establish db connection we need this file
const mongoose=require('mongoose');

//define the mongodb URL
const mongoURL='mongodb://localhost:27017/hotels'

//setup mongoDB connection
mongoose.connect(mongoURL)

const db=mongoose.connection;

//default event listeners for db connection
db.on('connected',()=>{
    console.log('connected to MongoDB server');
});

db.on('error',()=>{
    console.log('connection error');
});

db.on('disconnected',(err)=>{
    console.log('disconnected to MongoDB server');
});

module.exports=db;