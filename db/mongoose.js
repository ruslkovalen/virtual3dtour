var mongoose = require('mongoose');

mongoose.connect('mongodb://ruslan:0196ruslan@ds227168.mlab.com:27168/quiz');
var db = mongoose.connection;

db.on('error', function (err) {
	console.error('connection error:', err.message);
});
db.once('open', function callback () {
	console.info("Connected to DB!");
});

module.exports = db;