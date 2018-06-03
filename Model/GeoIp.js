var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var GeoIp = new Schema({
	name: { type: String, required: true },
	count:{type:Number}	
});

var GeoIpModel = mongoose.model('GeoIp', GeoIp);

module.exports = GeoIpModel;