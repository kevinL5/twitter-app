var mongoose = require('mongoose')

var tweetSchema = new mongoose.Schema({
    message: String,
    date: String,
    createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Tweet', tweetSchema);
