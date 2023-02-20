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
    var sql = 'SELECT * FROM users WHERE username=? and password=?;';
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
 * Register Animals
 */
app.post('/registerAnimal', function (req, res){
    //recoger datos
    let name = req.body.name;
    let specie = req.body.specie;
    let breed = req.body.breed;
    let age = req.body.age;
    let sex = req.body.sex;
    let neutered = req.body.neutered;

    // Consulta parametrizada.
    var sql = 'INSERT INTO animals (name, specie, breed, age, sex, neutered) VALUES (?,?,?,?,?,?);';
    connection.query(sql,[name,specie,breed,age,sex,neutered],function(error,result){
        if(error){
            console.log(req.body);
            console.log(error);
            res.status(400).send("The animal could not register");
        
        }else{ // no hay errores
            console.log(result);
            console.log(req.body);
            // comprobar que el objeto se ha resivido correctamente
            res.json(req.body);
        }
    })

})

/**
 * Show User list(funciona)
 */

app.get('/users', (req,res) => {
    console.log("We are in users list!");

    connection.query("SELECT * FROM users", (error, results)=>{
        if (error) {
            res.status(400).send(null)
        }else{
            res.status(200).send(results);
        }
    })
});

/**
 * Show Animal list(funciona)
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

/**
 * Update animal (no funciona)
 */
app.put('/update-animal', function (req, res) {
    
    let id = req.body.id;
    let name = req.body.name;
    let specie = req.body.specie;
    let breed = req.body.breed;
    let age = req.body.age;
    let sex = req.body.sex;
    let neutered = req.body.neutered;

    var sql = 'UPDATE animals SET name=?, specie=?, breed=?, age=?, sex=?, neutered=? WHERE id=?';
    connection.query(sql,[name,specie,breed,age,sex,neutered, id],function(error,result){
        if(error!=null){
            console.log(req.body);
            console.log(error);
            res.status(400).send("The animal could not be updated");
        
        }else{ // no hay errores
            console.log(result);
            console.log(req.body);
            // comprobar que el objeto se ha resivido correctamente
            res.json(req.body);
        }
    })
});

/**
 * Delete animal from the list (funciona)
 */
app.delete('/delete-animal', function (req, res) {
 
    let animal_id = req.body.id;
 
    if (!animal_id) {
        return res.status(400).send({ error: true, message: 'Please provide animal_id' });
    }
    connection.query('DELETE FROM animals WHERE id = ?', [animal_id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Animal has been deleted successfully.' });
    });
});


//
app.listen(3000, ()=>{
console.log('Aquesta és la nostra API-REST que corre en http://localhost:3000')
});