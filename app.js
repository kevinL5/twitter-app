var express = require('express')
var app = express()
var server = require('http').createServer(app)
var io = require('socket.io')(server)
var mongoose = require('mongoose')
var moment = require('moment')

var Tweet = require('./models/tweet')

mongoose.connect('mongodb://localhost:27017/twitter-app')

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('index')
})

io.on('connection', (socket) => {
    Tweet.find({})
    .sort('-createdAt')
    .exec((err, tweets) => {
        if(!err) {
            socket.emit('load-tweets', tweets )
        }
    })

    socket.on('send-tweet', (data) => {
        var tweet = new Tweet({
            message: data.message,
            date: moment().format('MMM Do [-] h:mm:ss a')
        })

        tweet.save()

        io.emit('new-tweet', { 
            message: data.message, 
            date: moment().format('MMM Do, h:mm:ss a')
        })

    })


})

server.listen(3000, () => {
    console.log('Server started')
})