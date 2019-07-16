var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var paymentSchema = new Schema({
    paid_amount : {type: Number},
    user_id : {type: mongoose.Schema.Types.ObjectId, ref:'User'},
    payment_date: {type: Date}
});

module.exports = mongoose.model('Payment', paymentSchema);