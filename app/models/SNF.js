// grab the mongoose module
var mongoose = require('mongoose');

// define our nerd model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('SNF', {
	id:{type:String},
	name : {type : String, default: ''},
	Payer :{type:String},
	Admissions : {type:String},
	weightlimit:{type:Number},
	Beds:{type:String},
	Securedmemory:{type:Number},
	Contracts:{type:String},
	DayswithMD:{type:String},
	DayswithNP:{type:String},
	CoveredHours:{type:String},
	AdvancedCPR:{type:Boolean}

});

