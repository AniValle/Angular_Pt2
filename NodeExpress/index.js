/**
 * @authors Ani Valle and Andrea Morales
 * @file    This files defines connections to MySql DB
 *          and serves as a controller for the incoming requests.
 */

'use strict'
// Imports and creation of constants for their use
//----------------------------------------------------
const   express = require('express');
var     cors    = require('cors');
var     mysql   = require('mysql');
const   bodyParser = require('body-parser');
const   app     = express();

// bodyParser configuration to support json inputs
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Cors
app.use(cors());


// Load jsonwebtoken package
//----------------------------------------------------
const jwt = require('jsonwebtoken');
// Secret word required in the token
const accessTokenSecret = 'youraccesstokensecret';


// CONNECTION WITH THE DATABASE
//----------------------------------------------------
var connection = mysql.createConnection({
    host: 'localhost',
    database: 'Animal_shelter',
    user: 'root',
    password: ''
});
// connection
connection.connect(function (err) {
    if (err) {
        console.error('Error connecting:' + err.stack);
        return;
    }
    console.log('Connected as id ' + connection.threadId);
});


// Main show if npm is up
app.get('/', (req, res) => {
    res.send(JSON.stringify('Hello to my web'));
});

//---------------------------------------------------------------------------------------
/**
 * AUTHENTICATES
 * let's create a constant that will act as middleware for whoever uses it (get and post animals)
 * @param req request
 * @param res response
 * @param next
 * @return void
 */
//---------------------------------------------------------------------------------------
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                console.log(err)
                if (jwt.TokenExpiredError) {
                    res.sendStatus(401);
                }
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};


//---------------------------------------------------------------------------------------
/**
 * LOGIN CHECK
 * @param req request
 * @param res response
 * given some credentials, it makes the query to the database and manages the errors.
 */
//---------------------------------------------------------------------------------------
app.post('/login', function (req, res) {

    // Collect user credentials
    let username = req.body.username;
    let password = req.body.password;

    // Consulta parametrizada.
    var sql = 'SELECT * FROM users WHERE username=? and password=?;';
    connection.query(sql, [username, password], function (error, result) {

        // Error if the credentials were not found in the database
        if (error != null) {
            res.status(400).send("Username or password incorrect");

        } else { // there are no errors
            console.log(result[0]);
            const accessToken = jwt.sign({ username: result[0].username, role: result[0].role }, accessTokenSecret, { expiresIn: '1h' });
            res.send({ data: result[0], token: accessToken });
        }
    });
});

//---------------------------------------------------------------------------------------
/**
 * REGISTER USER
 * @param req request
 * @param res response
 * collects the user data passed from angular and through a 
 * sql query registers a new user and manages errors,
 */
//---------------------------------------------------------------------------------------
app.post('/register', function (req, res) {

    // Collect data user
    let username = req.body.username;
    let password = req.body.pass;
    let role = "registered";
    let name = req.body.name;
    let lastname = req.body.lastname;
    let mail = req.body.email;
    let mobile = req.body.tel;

    // Consulta parametrizada.
    var sql = 'INSERT INTO users (username, password, role, name, lastname, mail, mobile) VALUES (?,?,?,?,?,?,?);';
    connection.query(sql, [username, password, role, name, lastname, mail, mobile], function (error, result) {
        if (error) {
            console.log(req.body);
            console.log(error);
            res.status(400).send("The user could not register");

        } else { // no mistakes
            console.log(result);
            console.log(req.body);
            // check that the object has been received correctly
            res.json(req.body);

        }
    });
})

//---------------------------------------------------------------------------------------
/**
 * SHOW USER LIST
 * @param req request
 * @param res response
 * Get all the users and send them to angular.
 */
//---------------------------------------------------------------------------------------
app.get('/users', authenticateJWT, (req, res) => {
    console.log("We are in users list!");
    // connection
    connection.query("SELECT * FROM users", (error, results) => {
        if (error) {
            res.status(400).send(null)
        } else {
            res.status(200).send(results);
        }
    })
});

//---------------------------------------------------------------------------------------
/**
 * SHOW ANIMAL LIST
 * @param req request
 * @param res response
 * Get all the animals and send them to angular.
 */
//---------------------------------------------------------------------------------------
app.get('/residents', authenticateJWT, (req, res) => {
    console.log("We are in animal residents!");
    // connection
    connection.query("SELECT * FROM animals", (error, results) => {
        if (error) {
            res.status(400).send(null)
        } else {
            res.status(200).send(results);
        }
    })
});


//---------------------------------------------------------------------------------------
/**
 * REGISTER ANIMALS
 * @param req request
 * @param res response
 * Register an animal in the database
 */
//---------------------------------------------------------------------------------------
app.post('/registerAnimal', authenticateJWT, function (req, res) {

    //rol ususario autenticado
    const role = req.user.role;

    // collect animal data
    let name = req.body.name;
    let specie = req.body.specie;
    let breed = req.body.breed;
    let age = req.body.age;
    let sex = req.body.sex;
    let neutered = req.body.neutered;

    //  check user role to protect this action
    if (role !== 'admin') {
        return res.status(403).send({ error: true, message: "You have not permissions to do this!" });
    }
    // Consulta parametrizada.
    var sql = 'INSERT INTO animals (name, specie, breed, age, sex, neutered) VALUES (?,?,?,?,?,?);';
    connection.query(sql, [name, specie, breed, age, sex, neutered], function (error, result) {
        if (error) {
            console.log(req.body);
            console.log(error);
            res.status(400).send("The animal could not register");

        } else { // no hay errores
            console.log(result);
            console.log(req.body);
            // comprobar que el objeto se ha recibido correctamente
            res.json(req.body);
        }
    })

})


//---------------------------------------------------------------------------------------
/**
 * GET ANIMAL BY ID
 * @param req request
 * @param res response
 * given an id get the animal
 */
//---------------------------------------------------------------------------------------
app.get('/animal/:id', function (req, res) {
    let animal_id = req.params.id;
    console.log(animal_id);

    //  check user role to protect this action
    if (!animal_id) {
        return res.status(400).send({ error: true, message: 'Please provide animal_id' });
    }

    var sql = "SELECT * FROM animals where id=?"
    connection.query(sql, [animal_id], function (error, result) {
        if (error != null) {
            console.log(req.body);
            console.log(error);
            res.status(400).send("not found Animal");
        } else { // no hay errores
            console.log(result);
            console.log(req.body);
            // comprobar que el objeto se ha resivido correctamente
            res.json(req.body);
        }
    });
})

//---------------------------------------------------------------------------------------
/**
 * UPDATE ANIMAL
 * @param req request
 * @param res response
 * Update the data of an animal
 */
//---------------------------------------------------------------------------------------
app.put('/update-animal', authenticateJWT, function (req, res) {

    //rol ususario autenticado
    const role = req.user.role;

    // collect animal data
    let id = req.body.id;
    let name = req.body.name;
    let specie = req.body.specie;
    let breed = req.body.breed;
    let age = req.body.age;
    let sex = req.body.sex;
    let neutered = req.body.neutered;

    //  check user role to protect this action
    if (role !== 'admin') {
        return res.status(403).send({ error: true, message: "You have not permissions to do this!" });
    }

    // parameterized query
    var sql = 'UPDATE animals SET name=?, specie=?, breed=?, age=?, sex=?, neutered=? WHERE id=?';
    connection.query(sql, [name, specie, breed, age, sex, neutered, id], function (error, result) {
        if (error != null) {
            console.log(error);
            res.status(400).send("The animal could not be updated");

        } else { // no hay errores
            return res.send({ error: false, data: result['affectedRows'], message: 'The animal has been successfully updated.' });

        }
    })
});

//---------------------------------------------------------------------------------------
/**
 * DELETE ANIMAL
 * @param req request
 * @param res response
 * Delete the data of an animal
 */
//---------------------------------------------------------------------------------------
app.post('/delete-animal', authenticateJWT, function (req, res) {

    // collect animal id
    let animal_id = req.body.id;

    //rol ususario autenticado
    const role = req.user.role;

    //  check user role to protect this action
    if (role !== 'admin') {
        return res.status(403).send({ error: true, message: "You have not permissions to do this!" });
    }

    if (!animal_id) {
        return res.status(400).send({ error: true, message: 'Please provide animal_id' });
    }
    var sql = 'DELETE FROM animals WHERE id =?';
    connection.query(sql, [animal_id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Animal has been deleted successfully.' });
    });
});


//
app.listen(3000, () => {
    console.log('Aquesta és la nostra API-REST que corre en http://localhost:3000')
});
