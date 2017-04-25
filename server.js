var express = require('express')
var app  = express();
//var mongoose = require('mongoose'); 
var mongojs = require ('mongojs');
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var db = mongojs('CMP',['CMP'])
// configuration =================

//mongoose.connect('mongodb://localhost:27017/CaseManagment')		
// Use Body Parser
//app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.get('/data',function(req,res){
	console.log("I recive the get request");
	db.CMP.find(function(err,docs){
	console.log("please test me")	
    console.log(docs);
    res.json(docs);
	});
});


app.post('/data',function(req,res){
	console.log(req.body);
	db.CMP.insert(req.body,function(err,doc){
	res.json(doc);
	});
});
 app.delete('/data/:id',function(req,res){

 	var id = req.params.id;
 	console.log(id);
 	db.CMP.remove({_id:mongojs.ObjectId(id)},function(err,doc){
 		res.json(doc);
 	});
 });

app.get('/data/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.CMP.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.put('/data/:id',function(req,res){
	var id =req.params.id;
	console.log(req.body.name);
	db.CMP.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {name: req.body.name, Payer: req.body.Payer, Admissions: req.body.Admissions,weightlimit: req.body.weightlimit, Beds: req.body.Beds,
    	BedType: req.body.BedType,Contracts: req.body.Contracts,DayswithMD: req.body.DayswithMD,CoveredHours: req.body.CoveredHours,AdvancedCPR: req.body.AdvancedCPR}},
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );
});

          
  app.listen( 8000, function() {

   console.log("App listening on port 8000");

})
require('./app/routes')(app); // pass our application into our routes
exports = module.exports = app; 						// expose app