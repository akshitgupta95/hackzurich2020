var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var FeelingsSchema = new Schema({
    userID: String,
    feeling: String,
    date: Date,
});

module.exports = mongoose.model('Feeling', FeelingsSchema );