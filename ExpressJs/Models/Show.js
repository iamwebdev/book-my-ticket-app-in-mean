var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var showSchema = new Schema({
    movie_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' },
    timing : { type: String },
    theatre :  {type : String},
    gold: { type: Number },
    silver : { type : Number },
    bronze : { type: Number }
})

module.exports = mongoose.model('Show', showSchema);