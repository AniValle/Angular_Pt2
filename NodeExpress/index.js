'use strict'
//importacions i creació de constants per a la seva utiliutzació
const express = require('express');
var cors = require('cors');
var mysql = require('mysql');
const bodyParser=require('body-parser');
const app=express();

//carrega del paquet jsonwebtoken
const jwt = require('jsonwebtoken');

//paraula secreta necessària en el token
const accessTokenSecret = 'youraccesstokensecret';

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
            res.status(400).send("Username or password incorrect");
            
        }else{ // no hay errores
            console.log(result[0]);
            const accessToken = jwt.sign({ username: result[0].username,  role: result[0].role }, accessTokenSecret, { expiresIn: '1h' });
            res.send({data:result[0], token: accessToken});
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
            // comprobar que el objeto se ha recibido correctamente
            res.json(req.body);

        }
    });
})


//creem una constant que farà de middleware a qui el faci servir (get i post de animals)
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                console.log(err)
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

/**
 * Register Animals
 */
app.post('/registerAnimal', authenticateJWT, function (req, res){
    
    //rol ususario autenticado
    const role = req.user.role;

    //recoger datos
    let name = req.body.name;
    let specie = req.body.specie;
    let breed = req.body.breed;
    let age = req.body.age;
    let sex = req.body.sex;
    let neutered = req.body.neutered;

    if(role !== 'admin'){
        return res.status(403).send({error: true, message: "You have not permissions to do this!"});
    }
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
            // comprobar que el objeto se ha recibido correctamente
            res.json(req.body);
        }
    })

})

/**
 * Show User list(funciona)
 */

app.get('/users', authenticateJWT, (req,res) => {
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

app.get('/residents',authenticateJWT, (req,res) => {
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
 * Get Animal by id
 */
app.get('/animal/:id', function (req, res) {
    let animal_id = req.params.id;
    console.log(animal_id);

    if(!animal_id) {
        return res.status(400).send({ error: true, message: 'Please provide animal_id'});
    }

    var sql = "SELECT * FROM animals where id=?"
    connection.query(sql, [animal_id], function (error,result){
        // if (error) throw error;
        // return res.send({ error: false, data: result[0], message: 'animal data.'});
        if(error!=null){
            console.log(req.body);
            console.log(error);
            res.status(400).send("not found Animal");
        
        }else{ // no hay errores
            console.log(result);
            console.log(req.body);
            // comprobar que el objeto se ha resivido correctamente
            res.json(req.body);
        }
    });
})


/**
 * Update animal 
 */
app.put('/update-animal',authenticateJWT, function (req, res) {
    
    //rol ususario autenticado
    const role = req.user.role;

    let id = req.body.id;
    let name = req.body.name;
    let specie = req.body.specie;
    let breed = req.body.breed;
    let age = req.body.age;
    let sex = req.body.sex;
    let neutered = req.body.neutered;

    if(role !== 'admin'){
        return res.status(403).send({error: true, message: "You have not permissions to do this!"});
    }

    var sql = 'UPDATE animals SET name=?, specie=?, breed=?, age=?, sex=?, neutered=? WHERE id=?';
    connection.query(sql,[name,specie,breed,age,sex,neutered, id],function(error,result){
        if(error!=null){
            console.log(req.body);
            console.log(error);
            res.status(400).send("The animal could not be updated");
        
        }else{ // no hay errores
            console.log(result);
            console.log(req.body);
            // comprobar que el objeto se ha recibido correctamente
            res.json(req.body);
        }
    })
});

/**
 * Delete animal from the list (funciona)
 */
app.delete('/delete-animal',authenticateJWT, function (req, res) {
 
    let animal_id = req.body.id;
    
    if(role !== 'admin'){
        return res.status(403).send({error: true, message: "You have not permissions to do this!"});
    }

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
