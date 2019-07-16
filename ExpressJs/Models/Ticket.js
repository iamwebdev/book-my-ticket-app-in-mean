var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ticketSchema = new Schema({
    payment_id: {type: mongoose.Schema.Types.ObjectId, ref : 'Payment'},
    movie_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Movie'},
    theatre_name: {type: String},
    show_timing: {type: String},
    show_date : {type: Date},
    ticket_number: {type: String},
    ticket_class: {type: String}
});

module.exports = mongoose.model('Ticket', ticketSchema);