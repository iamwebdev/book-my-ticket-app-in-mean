var express = require('express');
var router = express.Router();
var Movie = require('../Models/Movie');
var ObjectId = require('mongoose').Types.ObjectId;

router.post('/add-movie', (req, res) => {
    var formData = new Movie({
        name: req.body.name,
        date: req.body.date,
        actor: req.body.actor,
        path : '/movies/anna.jpg'
    });
    formData.save((err, doc) => {
        if (!err)
            res.json({success: true, message: 'Movie added'})
        else
            res.json({success: false, message: 'Sorry something went wrong'})
    })
})

router.get('/all-movies', (req,res) => {
    Movie.find((err, doc) => {
        if (!err) {
            return res.json(doc)
        } else {
            return res.json(err)
        }
    })
})

router.get('/movie/:id/edit', (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        Movie.findById(req.params.id, (err, doc) => {
            if (!err) { 
                res.send(doc)
                // return res.json({success: true, doc});
            } else {
                return res.json({success: false});
            }
        })
    } else {
        return res.json({success: false});
    }
})

router.put('/movie/:id', (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        var formData = {
            name: req.body.name,
            date: req.body.date,
            actor: req.body.actor
        }
        Movie.findByIdAndUpdate(req.params.id, {$set : formData}, {new: true}, (err, doc) => {
            if (!err) {
                return res.json({success: true, message: 'Movie Updated'});
            } else {
                return res.json({success: false, message: 'Sorry something went wrong'});
            }
        })
    } else {
        return res.json({success: false, message: 'Sorry something went wrong'});
    }
})

router.delete('/movie/:id',(req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        Movie.findByIdAndRemove(req.params.id, (err, doc) => {
            if (!err) {
                return res.json({success: true, message: 'Movie deleted'});
            } else {
                return res.json({success: false, message: 'Sorry something went wrong'});
            }
        });
    } else {
        return res.json({success: false, message: 'Sorry something went wrong'});
    }
});

router.get('/get-current-movies',(req, res) => {
    Movie.find({date: {$lt: new Date()}}, (err, docs) => {
        if (!err) {
            return res.json({ success: true , data:docs })
        } else {
            return res.json({ success: false })
        }
    })
})

router.get('/get-upcoming-movies',(req, res) => {
    Movie.find({date: {$gte: new Date()}}, (err, docs) => {
        if (!err) {
            return res.json({ success: true , data:docs })
        } else {
            return res.json({ success: false })
        }
    })
})

module.exports = router