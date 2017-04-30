
// // modules =================================================
var express        = require('express');
var app            = express();
var mongojs = require ('mongojs');
//var db = mongojs('CMP',['CMP'])
var db = mongojs('myuser:test@ds121171.mlab.com:21171/cmp', ['CMP'])
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
// configuration ===========================================	
var port = process.env.PORT || 8081; // set our port
// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

// start app ===============================================
app.listen(port);
app.get('/data',function(req,res){
	db.CMP.find(function(err,docs){
    res.json(docs);
	});
});

app.post('/data',function(req,res){
	db.CMP.insert(req.body,function(err,doc){
	res.json(doc);
	});
});

app.post('/search',function(req,res){
	console.log("search is working");
 	var searchQuery = {};
 	if (!(req.body._id === "" || req.body._id === undefined || req.body._id === null)) {
 		searchQuery._id = mongojs.ObjectId(req.body._id);
 	}	

 	if (!(req.body.name === "" || req.body.name === undefined || req.body.name === null)) {
 		searchQuery.name = req.body.name;
 	}

 	if (!(req.body.Payer === "" || req.body.Payer === undefined || req.body.Payer === null)) {
 		searchQuery.Payer = req.body.Payer;
 	}		

	db.CMP.find(searchQuery,function(err,doc){
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
	console.log(req.body.name+"test me");
	db.CMP.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {name: req.body.name, Payer: req.body.Payer, Admissions: req.body.Admissions,weightlimit: req.body.weightlimit, Beds: req.body.Beds,
    	BedType: req.body.BedType,Contracts: req.body.Contracts,DayswithMD: req.body.DayswithMD,CoveredHours: req.body.CoveredHours,AdvancedCPR: req.body.AdvancedCPR}},
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );
});

exports = module.exports = app; 						// expose app