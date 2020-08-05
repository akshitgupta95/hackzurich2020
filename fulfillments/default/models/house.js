var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var HouseSchema = new Schema({
    name: String,
    description: String,
    summary: String,
    url: String

});

module.exports = mongoose.model('House', HouseSchema );