var express = require('express');
var router = express.Router();
var Payment = require('../Models/Payment');
var mongoose = require('mongoose');

router.get('/get-payments/:date', (req,res) => {
    var endDate = new Date(req.params.date);
    endDate.setDate(endDate.getDate() + 1)
    Payment.aggregate([
        { $match: {payment_date: {$gte: new Date(req.params.date),$lte: new Date(endDate)}}},
        {
            $lookup: {
                from: 'tickets',
                localField: '_id',
                foreignField: 'payment_id',
                as: 'ticket_info'
            }
        },
        {
            $project:{
               "name":"$ticket_info.theatre_name",
                "total": {$sum: '$paid_amount'}
            }
        }
    ]).then(docs => {
        return res.json(docs)
    })
})
    
module.exports = router;