
var mongoose = require('mongoose')
var Schema = mongoose.Schema

var FacilitySchema = new Schema({
    id:String,
	name : String,
	Payer :String,
	Admissions :String,
	weightlimit:Number,
	Beds:String,
	BedType:Number,
	Contracts:String,
	DayswithMD:String,
	DayswithNP:String,
	CoveredHours:String,
	AdvancedCPR:String
})

var CMP = mongoose.model( 'CMP', FacilitySchema )

module.exports = CMP
