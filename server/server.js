var express = require('express');
var app = express();
var port = process.env.PORT || 5000;

// require and use body-parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

// require and use name_router.js
var nameRouter = require('./routes/name_router.js');
app.use('/names', nameRouter);

// share static files, found in public folder
app.use(express.static('server/public'));

//start up the server
app.listen(port, function(){
    console.log('Server running on port:', port);
})