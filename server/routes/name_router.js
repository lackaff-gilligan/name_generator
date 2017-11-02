var express = require('express');
var router = express.Router();
//var names = []; //<-- do I need this for anything now?
//get access to the generateNames() from the module
var generateNames = require('../modules/generateNames.js');
console.log('testing generateNames:', generateNames());

var pg = require('pg');
var config = {
    database: 'my_practice', //name of db
    host: 'localhost', //where is the db?
    port: 5432, //the port number for the db, 5432 is the default
    max: 10, //how many connections at one time
    idleTimeoutMillis: 30000 //close idle connections after 30 sec
}

//create my pool
var pool = new pg.Pool(config);

//GET route for all named babies
// http://localhost:5000/names will go here
router.get('/', function(req, res){
    //attempt to connect to the db
    pool.connect(function(errorConnectingToDb, db, done){
        if(errorConnectingToDb) {
            //there was an error and no connection was made
            console.log('Error connecting in GET route', errorConnectingToDb);
            res.sendStatus(500);
        } else {
            //successful connection to db! pool -1
            var queryText = 'SELECT * FROM "babyNames" ORDER BY "id" DESC;';
            db.query(queryText, function(errorMakingQuery, result){
                //received either an error or a result at this point
                done(); //pool +1
                if(errorMakingQuery) {
                    console.log('Error making query in GET route', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    res.send(result.rows);
                }
            }); //END QUERY
        }
    }); //END POOL
}); //END GET ROUTE

//POST ROUTE
//Express removed the '/names' when we do a app.use
router.post('/', function(req, res){
    var babyInfo = req.body; //the data that was sent
    console.log('req.body now babyInfo', babyInfo);
    var namePairArr = generateNames(); //generate a new first and middle name pair
    console.log('namePairArr:', namePairArr);
    //attempt to connect to db
    pool.connect(function(errorConnectingToDb, db, done){
        if(errorConnectingToDb){
            //there was an error and no connection was made
            console.log('Error connecting in POST route', errorConnectingToDb);
            res.sendStatus(500);
        } else {
            //successful connection to db! pool -1
            var queryText = 'INSERT INTO "babyNames" ("bday", "height", "eyeColor", "spiritAnimal", "fName", "mName") VALUES ($1, $2, $3, $4, $5, $6);';
            db.query(queryText, [babyInfo.bday, babyInfo.height, babyInfo.eyeColor, babyInfo.sAnimal, namePairArr[0], namePairArr[1]], function(errorMakingQuery, result){
                //have received either an error or result at this point
                done(); //pool +1
                if (errorMakingQuery){
                    console.log('Error making query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    //send back success!
                    res.sendStatus(201);
                }
            }); //END QUERY
        }
    }); //END POOL
});

//DELETE ROUTE
router.delete('/:id', function(req, res){
    var babyId = req.params.id;
    //attempt to connect to db
    pool.connect(function(errorConnectingToDb, db, done){
        if(errorConnectingToDb){
            //there was an error and no connection was made
            console.log('error connecting to db in DELETE route', errorConnectingToDb);
            res.sendStatus(500);
        } else {
            //successful connection to db! pool -1
            var queryText = 'DELETE FROM "babyNames" WHERE "id" = $1;';
            db.query(queryText, [babyId], function(errorMakingQuery, result){
                //have received either and error or result at this point
                done(); //pool +1
                if(errorMakingQuery){
                    console.log('error making query in DELETE route', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    res.send(result.rows);
                }
            }); //END QUERY
        }
    }); //END POOL
}); //END DELETE ROUTE

module.exports = router;