var mongoose  = require('mongoose');
var Schema = mongoose.Schema;

var Applicant = new Schema({
	FullName: { type: String, required: true },
    Email: { type: String, required: true },
    Zno: { type: Number, required: true }	
});

var ApplicantModel = mongoose.model('Applicant', Applicant);

module.exports = ApplicantModel;
