var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var movieSchema = new Schema({
    name: {type: String},
    date: {type: Date},
    actor: {type: String},
    path : {type: String}
});

module.exports = mongoose.model('Movie', movieSchema);