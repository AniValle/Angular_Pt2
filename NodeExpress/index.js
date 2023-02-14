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

//configuració del bodyParser perquè admeti entrades json i
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// Cors
app.use(cors());




app.get('/', (req,res) => {
    res.send(JSON.stringify('Hello to my web'));
});

// comprobacion login
app.post('/login', function (req, res) {

    //recojo usuario
    let username = req.body.username;

    //recojo password
    let password = req.body.password;

    // connection
    connection.connect(function(err) {
        if (err) {
            console.error('Error connecting: ' + err.stack);
            return;
        }
        console.log('Connected as id ' + connection.threadId);
    });

    // Consulta parametrizada.
    var sql = 'SELECT * FROM users WHERE username=? and password=?';
    connection.query(sql,[username, password],function(error, result){
        
        if(error){
            res.send("Username or password incorrect");
            
        }else{ // no hay errores
            console.log(result[0]);
            res.json(result[0]);
        }
    });
});

//
app.listen(3000, ()=>{
console.log('Aquesta és la nostra API-REST que corre en http://localhost:3000')
});