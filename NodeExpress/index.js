'use strict'
//importacions i creació de constants per a la seva utiliutzació
const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const bodyParser=require('body-parser');
const app=express()
//configuració del bodyParser perquè admeti entrades json i
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

// Cors
app.use(cors())
// MYSQL

const connection = mysql.createConnection({
    host: 'localhost',
    database: 'Animal_shelter',
     user: 'root',
    password: ''
});

//fem servir la BBDD que tenim
app.post('/api/login', function (req, res){
    console.log("estem a login");

    //provem de connectar-nos i capturar possibles errors
    connection.connect(function (err) {
        console.log(err);
        if (err) {
            console.error('Error connecting:' + err.stack);
            return;
        }
        console.log('Connected as id ' + connection.threadId);
    });

    connection.query('SELECT * FROM users', function(error,results,field){
        if (error){
            res.status(400).send({resultats: null});
        }else{
        /*COMPROVACIÓ DE DADES PER CONSOLA DE NODE*/
        // console.log(results);
        // results.forEach(result => {
        // console.log(result.user);
        // })
        res.status(200).send({resultats: results});
        }
    });
});



// para la vista Susana
app.get('/', (req,res) => {
    res.send('Hola to my web');
});

// comprobacion login
app.post('/login', function (req, res) {

    //recojo usuario
    let username=req.body.username;

    //recojo password
    let password=req.body.password;

    // connection
    connection.connect(function (err) {
        if (err) {
            console.error('Error connecting:' + err.stack);
            return;
        }
        console.log('Connected as id'+ connection.threadId);
    });

    // Consulta parametrizada.
    var sql = 'SELECT * FROM users WHERE username =? AND password =?'
    connection.query(sql,[username,password],function(error,result){
          console.log("ererererer"+error);
        if(error){
            res.send('Username and password incorrect');
            
        }else{ // no hay errores
            console.log(result[0]);
            res.json(result[0]);
       }
    });
});

//
app.listen(3000, ()=>{
console.log('Aquesta és la nostra API-REST que corre en http://localhost:3000')
})