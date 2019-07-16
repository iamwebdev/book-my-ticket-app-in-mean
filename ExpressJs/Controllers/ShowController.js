var express = require('express');
var router = express.Router();
var Show = require('../Models/Show');
var Movie = require('../Models/Movie');
var ObjectId = require('mongoose').Types.ObjectId;

router.get('/all-shows',(req, res) => {
    Show.find((err, docs) => {
        if(!err) {
            return res.json({success: true, data : docs})
        } else {
            return res.json({success: false})
        }
    })
})

router.get('/get-theatres', (req, res) => {
    Show.find().distinct('theatre', (err, docs) => {
        if(!err) {
            return res.json({success: true, data : docs})
        } else {
            return res.json({success: false})
        }
    })
})

router.post('/add-show', (req, res) => {
    var showData = new Show({
        movie_id : req.body.movie_id,
        timing : req.body.timing,
        theatre : req.body.theatre,
        gold : req.body.gold_ticket,
        silver: req.body.silver_ticket,
        bronze: req.body.bronze_ticket
    })
    showData.save((err, doc) => {
        if (!err) {
            return res.json({success: true, message : 'Show setup'})
        } else {
            return res.json({success: false, message: 'Oops try again'})
        }
    })
})

router.get('/show/:id', (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        Show.findById(req.params.id,(err, doc) => {
            if (!err) {
                return res.json({success: true, data: doc})
            } else {
                return res.json({success: false, message: 'Oops try again'})
            }
        })
    } else {
        return res.json({success: false, message: 'Data not valid'})
    }
})

router.put('/show/:id', (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        var showData = {
            movie_id : req.body.movie_id,
            timing : req.body.timing,
            theatre : req.body.theatre,
            gold : req.body.gold_ticket,
            silver: req.body.silver_ticket,
            bronze: req.body.bronze_ticket 
        }
        Show.findByIdAndUpdate(req.params.id, {$set: showData}, {new : true}, (err, doc) => {
            if (!err) {
                return res.json({success: true, message: 'Show updated'})
            } else {
                return res.json({success: false, message: 'Oops try again'+err})
            }
        })
    } else {
        return res.json({success: false, message: 'Data not valid'})
    }
})

router.delete('/show/:id', (req, res) =>{
    if(ObjectId.isValid(req.params.id)) {
        Show.findByIdAndDelete(req.params.id, (err, doc) => {
            if (!err) {
                return res.json({success: true, message: 'Show deleted'})
            } else {
                return res.json({success: false, message: 'Oops try again'})
            }
        })
    } else {
        return res.json({success: false, message: 'Data not valid'})
    }
})

router.get('/get-shows/:theatre',(req, res) => {
    Show.find({theatre: req.params.theatre})
    .select('theatre')
    .populate('movie_id','name')
    .exec()
    .then(docs => {
        res.json(docs)
    })
})

router.get('/get-movie-list/:theatre',(req, res) => {
    Show.find({theatre:{$in:req.params.theatre}})
        .distinct('movie_id',(err, movie_id) => {
            Movie.find({'_id': {$in: movie_id}}, (err, docs) => {
                if (!err) {
                    return res.json({success: true, data: docs})
                } else {
                    return res.json({success: false})
                }
            })
        })
})

router.post('/get-ticket-amount', (req, res) => {
    var seatsArray = JSON.parse(req.body.ticketInfo);
    var totalAmount = 0;

    Object.keys(seatsArray).forEach(function (key){
        Show.findOne({ movie_id: req.body.movieId, timing: req.body.showTiming, theatre: req.body.theatreName })
        .select('gold silver bronze')
        .exec((err, doc) => {
            if (!err) {
                var ticketClass = seatsArray[key].toLowerCase();
                if (ticketClass == 'gold') {
                    var singleTicketAmount = doc.gold
                } else if (ticketClass == 'silver') {
                    var singleTicketAmount = doc.silver
                    // console.log('Silver')                 
                } else if (ticketClass == 'bronze') {
                    var singleTicketAmount = doc.bronze
                } else {
                    var singleTicketAmount = 0
                }
                totalAmount += singleTicketAmount;     
            } else {
                totalAmount += 0;     
            }
        });
    });
    setTimeout(() => {
       return res.json(totalAmount)
    }, 2000);
});

module.exports = router