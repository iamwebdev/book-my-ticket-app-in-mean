const mongoose = require('mongoose');

if (mongoose.connect('mongodb://localhost:27017/ticket', {useNewUrlParser: true }))
    console.log('MongoDb Connection Established')

module.exports = mongoose    