$(document).ready(function () {

    var socket = io.connect('http://localhost:3000')

    /* Load last tweets on start */
    socket.on('load-tweets', (data) => {
        $("#tweet-container").loadTemplate("templates/tweet.html", data)
    })

    /* Load new tweet */
    socket.on('new-tweet', function(data) {
        $("#tweet-container").loadTemplate(
            "templates/tweet.html", 
            data, 
            { prepend: true}
        )
    })

    /* Send a tweet */
    $('#tweet-input').keydown(function(event) {
        if (event.which == 13) {
            socket.emit('send-tweet', { message: $(this).val() })
            $(this).val('');
        }
    })


})