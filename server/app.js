var net = require('net');
var server = net.createServer();
var colors = require('colors');
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT

server.on('connection', function(socket) {
    var remoteAddress = socket.remoteAddress + ':' + socket.remotePort;
    console.log(`New client connection made on : ${remoteAddress}`.green);

    /** Events e.g. data, error, close, listening, drop etc */
    socket.on('data', function(d) {
        console.log(`Data from : remoteAddress -> ${remoteAddress} ~~ data -> ${d}`.cyan);
        socket.write(`Hello -> ${d}`)
    });

    socket.once('close', function() {
        console.log(`Connection from remoteAddress -> ${remoteAddress} closed`.yellow);
    });

    socket.on('error', function(error) {
        console.log(`Connection error from remoteAddress -> ${remoteAddress} with message -> ${error.message}`);
    });
});

server.on('error', function(error) {
    console.log('Some error has occured.')
});

server.listen(9000, function() {
    // console.log(`Server listening on port 9000.`);
    console.log(`Server listening on port :` + JSON.stringify(server.address()));
});