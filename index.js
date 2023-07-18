var express = require('express');
var bodyParser = require('body-parser');
var app = express();
const path = require('path');
var http = require('http').Server(app);
// var io = require('socket.io')(http);
// var redis = require('redis');


var port = process.env.PORT || 3000;


//starting redis insatnce
// var redisSubscriber = redis.createClient();
// redisPublisher = redis.createClient();

// Express Middleware
// app.use(express.static('public'));
// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'src/public')));
app.use(bodyParser.urlencoded({
    extended: true
}));

//receive this location from the client side
// io.on('connection', (socket) => {
//     console.log('socket created');
//     let previousId;

//     const safeJoin = currentId => {
//         socket.leave(previousId);
//         socket.join(currentId);
//         previousId = currentId;
//     };

//     socket.on('disconnect', () => {
//         console.log('Got disconnect!');
//     });

//     socket.on('lastKnownLocation', (data) => {
//         var location = JSON.stringify(data);
//         redisPublisher.publish('locationUpdate', location);
//         console.log('already published')
//     });
// });

// subscribing to the channel and display number of sub
// redisSubscriber.on('subscribe', (channel, count) => {
//     console.log(`client subscribed to  ${channel}, ${count} total subscriptions`);
// });

//publishing message to the subscribed channel(s)
// redisSubscriber.on('message', (channel, message) => {
//     console.log(`client channel  ${channel}:  ${message}`);
//     //when the server receives a location update from the client
//     // the data is published to the redis channel ‘locationUpdate’.
//     io.emit('locationUpdate', message);
// });

// Render Main HTML file
app.get('/', (req, res) => {
    //subscrbe to ‘locationUpdate’
    // redisSubscriber.subscribe('locationUpdate');
    res.sendFile('public/index.html', {
        root: __dirname
    });
});

app.get('/dashboard', (req, res) => {
    // Send the dashboard.html file
    res.sendFile(path.join(__dirname, 'views/dashboard.html'));
});

//Serve a Publisher HTML
// app.get('/publish', (req, res) => {
//     res.sendFile('views/publisher.html', {
//         root: __dirname
//     });
// });


// Start the Server
http.listen(port, () => {
    console.log(`Server Started. Listening on *:  ${port}`);
});

// ************************* STARTING NEW CODES*****************************************