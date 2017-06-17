
// // modules =================================================
var express = require('express'),
    app = express(), 
    mongojs = require ('mongojs'),
    secrets = require('./.secret.json'),
    db = mongojs(secrets.db_secret, ['CMP']),
    bodyParser = require('body-parser');

// configuration ===========================================
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

// start app ===============================================

app.listen( 8081, function() {
  console.log("App listening on port 8081");
});

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

function addToQuery(searchQuery, body, attribute) {
  if (!(body[attribute] === "" || body[attribute] === undefined || body[attribute] === null)) {
    searchQuery[attribute] = body[attribute];
  }
}

app.post('/search',function(req,res){
  console.log("search is working");
  var searchQuery = {};
  if (!(req.body._id === "" || req.body._id === undefined || req.body._id === null)) {
    searchQuery._id = mongojs.ObjectId(req.body._id);
  }

  addToQuery(searchQuery, req.body, "name");

  if (!(req.body.Payer === "" || req.body.Payer === undefined || req.body.Payer === null)) {
    searchQuery.Payer = { $all: req.body.Payer };
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

app.get('*', function(req, res) {
  res.sendFile('index.html', { root: 'public'});
});

exports = module.exports = app;             // expose app