var express = require('express');
var router = express.Router();
var names = [];

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
            var queryText = 'SELECT * FROM "babyNames";';
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

module.exports = router;