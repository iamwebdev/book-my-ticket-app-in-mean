var express =  require('express');
var router = express.Router();
var User = require('../Models/User');
const jwt = require('jsonwebtoken');
var Payment = require('../Models/Payment');
var mongoose = require('mongoose');
var Ticket = require('../Models/Ticket');
var Movie = require('../Models/Movie');

router.post('/register',(req,res) => {
    var formData = new User({
        name : req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    User.find({email: req.body.email})
        .countDocuments((err, count) => {
        if (!err) {
            if (count > 0) {
                return res.json({success: false, message: 'Email already exists'})
            } else {
                formData.save((err, doc) => {
                    if(!err)
                        return res.status(200).json({ success: true, message : 'Registered Successfully'})
                    else
                    return res.status(501).json({ success: false, message :'Something went wrong'})
                });     
            }
        } else {
            return res.json({success: false, message: 'Something went wrong !!!'})
        }            
    }) 

});

router.post('/login',(req, res) => {
    if (!req.body.email) {
       return res.json({ success: false, message: 'Email not provided' })
    } else {
        if (!req.body.password) {
            return res.json({ success: false, message: 'Password not provided' })
        } else {
            User.findOne({email: req.body.email, password: req.body.password}, (err, doc) => {
                if (err) {
                    return res.json({ success: false, message: err })
                }
                else {
                    if (!doc) {
                        return res.json({success:false ,message: 'Wrong Credentials'})
                    } else {
                        const token = jwt.sign({ userId: doc._id }, 'shhhhh', { expiresIn: '24h' }) 
                        return res.json({success: true, message: 'Valid', token: token, user: {username: doc.name, id: doc._id}});
                    }
                }
            })
        }
    }

})

router.use((req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        res.json({success: false, message: 'Token not found'})
    } else {
        jwt.verify(token, 'shhhhh', (err, decoded) => {
            if (err) {
                res.json({success: false, message: 'Token invalid: '+err})
            } else {
                req.decoded = decoded;
                next();
            }
        });
    }
});

router.get('/my-profile',(req, res) => {
    User.findOne({_id: req.decoded.userId}).select('_id name email is_admin').exec((err, doc) => {
        if (err) {
            return res.json({success: false, message: err});
        } else {
            if (!doc) {
                return res.json({success:false ,message: 'User not found'});
            } else {
                return res.json({success: true, user: doc });
            }
        }
    })

    router.get('/watched-movies',(req,res) =>{
        Payment.find({ user_id: mongoose.Types.ObjectId(req.decoded.userId)})
        .select('_id')
        .exec((err, docs) => {
            var ids = docs.map(function(doc){ return doc._id; });
            Ticket.find({'payment_id':{$in: ids}})
                    .populate('movie_id')
                    .distinct('movie_id')
                    .exec((err, docs) => {
                        if(err) {
                            console.log(err)
                        }else {
                            Movie.find({_id : {$in: docs}})
                                .exec((err, docs) => {
                                    return res.json(docs)
                                })
                        }
                    })
        })
    })
});

module.exports = router;
