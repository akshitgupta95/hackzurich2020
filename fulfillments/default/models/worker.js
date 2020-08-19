var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var WorkerSchema = new Schema({
    id: String,
    completedComplexScenario:[Boolean],
    completedEasyScenario:[Boolean]

});

module.exports = mongoose.model('Worker', WorkerSchema );