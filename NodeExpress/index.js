'use strict'
//importacions i creació de constants per a la seva utiliutzació
const express = require('express');
var cors = require('cors');
var mysql = require('mysql');
const bodyParser=require('body-parser');
const app=express();

// MYSQL

var connection = mysql.createConnection({
    host: 'localhost',
    database: 'Animal_shelter',
    user: 'root',
    password: ''
});


// connection
connection.connect(function(err){
    if (err) {
        console.error('Error connecting:'+ err.stack);
        return;
    }
    console.log('Connected as id ' + connection.threadId);
});

//configuració del bodyParser perquè admeti entrades json i
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// Cors
app.use(cors());



//main show if npm is up
app.get('/', (req,res) => {
    res.send(JSON.stringify('Hello to my web'));
});

// comprobacion login
app.post('/login', function (req, res) {

    //recojo usuario
    let username = req.body.username;

    //recojo password
    let password = req.body.password;

    // Consulta parametrizada.
    var sql = 'SELECT * FROM users WHERE username=? and password=?';
    connection.query(sql,[username, password],function(error, result){
        
        if(error!=null){
            res.status(400).send("Incorrect credentials");
            
        }else{ // no hay errores
            console.log(result[0]);
            res.json(result[0]);
        }
    });
});

/**
 * Register User
 */
app.post('/register', function (req, res) {
    //recojo usuario
    let username    = req.body.username;
    let password    = req.body.pass;
    let role        = "registered";
    let name        = req.body.name;
    let lastname    = req.body.lastname;
    let mail        = req.body.email;
    let mobile      = req.body.tel;

    // Consulta parametrizada.
    var sql = 'INSERT INTO users (username, password, role, name, lastname, mail, mobile) VALUES (?,?,?,?,?,?,?);';
    connection.query(sql,[username, password, role, name, lastname, mail, mobile],function(error, result){
        if(error){
            console.log(req.body);
            console.log(error);
            res.status(400).send("The user could not register");
            
        }else{ // no hay errores
            console.log(result);
            console.log(req.body);
            // comprobar que el objeto se ha resivido correctamente
            res.json(req.body);

        }
    });
})

/**
 * Animal list
 */

app.get('/residents', (req,res) => {
    console.log("We are in animal residents!");

    connection.query("SELECT * FROM animals", (error, results)=>{
        if (error) {
            res.status(400).send(null)
        }else{
            res.status(200).send(results);
        }
    })
});



//
app.listen(3000, ()=>{
console.log('Aquesta és la nostra API-REST que corre en http://localhost:3000')
});