const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('./db.js');
const cors = require('cors');
var AuthController = require('./Controllers/AuthController');
var MovieController = require('./Controllers/MovieController');
var ShowController = require('./Controllers/ShowController');
var TicketController =  require('./Controllers/TicketController');
var PaymentController = require('./Controllers/PaymentController');

var app = express();
app.use(bodyParser.json());
app.use(cors({origin: 'http://localhost:4200'}));
app.listen(3000, () => console.log('ExpressJs Server Engine Started'))
app.use('/',MovieController)
app.use('/', ShowController);
app.use('/', TicketController);
app.use('/', PaymentController);
app.use('/', AuthController);    