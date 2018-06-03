var mongoose    = require('mongoose');
var Schema = mongoose.Schema;

var Business = new Schema({
	name: { type: String, required: true },
	value: { type: Number, required: true },
	date :{ type: Date,required: true}	
});

var BusinessModel = mongoose.model('Business', Business);

module.exports = BusinessModel;
