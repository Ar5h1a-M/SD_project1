const express = require("express");
const path = require("path");
const mysql = require("mysql");
const dotenv = require("dotenv");// env to store environmental data we want protected
dotenv.config({path: './.env'}); // tell dotenv extension above where the file ,that has all the protected variables, is

const app = express();

// calling protected stored variables from .env
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,  // localhost or ip of server
    user: process.env.DATABASE_USER,      // xamp uses these values 
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE  
});

const publicDirectory = path.join(__dirname,'./public' ); //dirname = var from node js that gives acces to current directory
//console.log(__dirname);

app.use(express.static(publicDirectory));

app.use(express.urlencoded({ extended: false})); // parse encoded url body of info --> ensure can grab data
app.use (express.json()); //parse json bodies as sent by api

app.set('view engine', 'hbs');   // can just use plain index.html instead of hbs

db.connect((error) => {    //error catching wrt above details
    if(error){
        console.log(error);
    }else{
        console.log("MySql Connected...")
    }
})

//define routes from pages.js --> so all my get/post stuff can be organised in files 
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

app.listen(3000,()=>{
    console.log("server listening to port 3000");
})

