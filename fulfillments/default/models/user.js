var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSchema = new Schema({
    userId: String,
    name: String,

});

module.exports = mongoose.model('User', UserSchema );