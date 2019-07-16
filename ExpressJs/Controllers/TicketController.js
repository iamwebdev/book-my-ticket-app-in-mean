var express = require('express');
var router = express.Router();
var Payment = require('../Models/Payment');
var Ticket = require('../Models/Ticket');
var db = require('../db');

router.post('/book-my-ticket',(req, res) => {
    var paymentData = new Payment({
        user_id: req.body.user_id,
        paid_amount: req.body.amount,
        payment_date : new Date()
    })
    paymentData.save((err, doc) => {
        if (err) 
            return res.json({success: false})
    })
    Object.keys(req.body.seats).forEach(function(key) {
        var ticketData = new Ticket({
            payment_id: paymentData._id,
            movie_id: req.body.movie,
            theatre_name: req.body.theatre,
            show_timing: req.body.timing,
            show_date : req.body.date,
            ticket_number: key,
            ticket_class: req.body.seats[key]
        })
        ticketData.save();
    });
    return res.json({success: true, message:'Ticket Booked', payment_id: paymentData._id})
})

router.post('/get-booked-seats',(req,res) => {
    Ticket.find({movie_id: req.body.movie, theatre_name: req.body.theatre, show_timing: req.body.timing, show_date: req.body.date})
    .select('ticket_number')
    .exec((err, docs) => {
        res.json(docs)
    })
})

router.get('/get-ticket/:payment_id', (req,res) => {
    Ticket.find({payment_id: req.params.payment_id})
        .populate('payment_id')
        .populate('movie_id')
        .exec((err, docs) => {
            if (!err) {
                return res.json({success: true, data : docs})
            } else {
                return res.json({success: false})
            }
        })
})

module.exports = router;