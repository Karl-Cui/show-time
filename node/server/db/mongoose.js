const mongoose = require('mongoose')

/// connect to the database
// this connection persists after setting it up
mongoose.connect('mongodb://localhost:27017/ShowTime', { useNewUrlParser: true });

module.exports = { mongoose }
