const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name : {type: String},
    email: {type: String},
    password : { type: String },
    is_admin : {type: Boolean, default:0}
})

module.exports = mongoose.model('User', UserSchema);