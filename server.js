
// // modules =================================================
var express        = require('express');
var app            = express();
var mongojs = require ('mongojs');
//var db = mongojs('CMP',['CMP'])
var db = mongojs('myuser:test@ds121171.mlab.com:21171/cmp', ['CMP'])
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var path = require('path');

// configuration ===========================================	
// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

// start app ===============================================
// serve all asset files from necessary directories
    // app.use("/js", express.static(__dirname + "public/app/js"));
    // app.use("/css", express.static(__dirname + "public/app/css"));
    // app.use("/views", express.static(__dirname + "public/app/views"));


    // // serve index.html for all remaining routes, in order to leave routing up to angular
    // app.all("/*", function(req, res, next) {
    //     res.sendFile(path.join(__dirname, '/public', 'index.html'));
    // });
app.listen( 8081, function() {

   console.log("App listening on port 8000");

})
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
 	if (!(req.body.Admissions === "" || req.body.Admissions === undefined || req.body.Admissions === null)) {
 		searchQuery.Admissions= req.body.Admissions;
 	}
 	if (!(req.body.weightlimit === "" || req.body.weightlimit === undefined || req.body.weightlimit === null)) {
 		searchQuery.weightlimit= req.body.weightlimit;
 	}
 	if (!(req.body.Beds === "" || req.body.Beds === undefined || req.body.Beds === null)) {
 		searchQuery.Beds= req.body.Beds;
 	}
 	if (!(req.body.BedType === "" || req.body.BedType === undefined || req.body.BedType === null)) {
 		searchQuery.BedType= req.body.BedType;
 	}
 	if (!(req.body.Contracts === "" || req.body.Contracts === undefined || req.body.Contracts === null)) {
 		searchQuery.Contracts= req.body.Contracts;
 	}
 	if (!(req.body.DayswithMD === "" || req.body.DayswithMD === undefined || req.body.DayswithMD === null)) {
 		searchQuery.DayswithMD= req.body.DayswithMD;
 	}
 	if (!(req.body.CoveredHours === "" || req.body.CoveredHours === undefined || req.body.CoveredHours === null)) {
 		searchQuery.CoveredHours= req.body.CoveredHours;
 	}
 	if (!(req.body.AdvancedCPR === "" || req.body.AdvancedCPR === undefined || req.body.AdvancedCPR === null)) {
 		searchQuery.AdvancedCPR= req.body.AdvancedCPR;
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