var mongoose    = require('mongoose');
var Schema = mongoose.Schema;

var Visit = new Schema({
	date: { type: Date, required: true },
	count: { type: Number, required: true }	
});

var VisitModel = mongoose.model('Visit', Visit);

module.exports = VisitModel;
