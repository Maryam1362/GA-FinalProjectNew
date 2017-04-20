var express = require('express')
var app  = express();
var mongoose = require('mongoose'); 
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)


// configuration =================

mongoose.connect('mongodb://localhost:27017/CaseManagment')


app.use(express.static('public'))

// Use Body Parser
app.use(bodyParser.urlencoded({extended: true}))

    // listen (start app with node server.js) ======================================
    

app.listen( 8000, function() {

   console.log("App listening on port 8000");

})
require('./app/routes')(app); // pass our application into our routes
exports = module.exports = app; 						// expose app