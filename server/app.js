var net = require('net');
var server = net.createServer();

server.on('connection', function() {
    console.log('new client connection made.')
});

server.listen(9000, function() {
    console.log('Server listening on port 9000 !');
});