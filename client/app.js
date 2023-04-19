var readlineSync = require('readline-sync');
var colors = require('colors');
var net = require('net');

var HOST = '127.0.0.1';
var PORT = 9000; // Server port

var client = null;

function OpenConnection() {
    if (client) {
        console.log('Connection already established'.rainbow);
        setTimeout(function() {
            menu();
        }, 0);
        return;
    };

    client = new net.Socket();

    client.on('error', function (err) {
        client.destroy();
        client = null;
        console.log('ERROR: Connection could not be established.');
        console.log(`ERROR Msg: ${err.message}`)
        setTimeout(function() {
            menu();
        }, 0);
    });

    client.on('data', function(data) {
        console.log('Received: '.cyan, data);
        setTimeout(function() {
            menu();
        }, 0);
    });

    client.connect(PORT, HOST, function() {
        console.log('Connection established successfully'.rainbow);
        setTimeout(function() {
            menu();
        }, 0);
    });
};

function SendData(data) {
    if (!client){
        console.log('Connection is not yet established.'.red);
        setTimeout(function() {
            menu();
        }, 0);
        return;
    };

    client.write(data);
    setTimeout(function() {
        menu();
    }, 0);
    return;
};

function CloseConnection() {
    if (!client){
        console.log('Connection is not yet established.'.red);
        setTimeout(function() {
            menu();
        }, 0);
        return;
    };

    client.destroy();
    client = null;
    console.log('Connection closed succesfully'.yellow);
    setTimeout(function() {
        menu();
    }, 0);
};

function menu() {
    var lineRead = readlineSync.question('\n\nEnter option (1-Open, 2-Send, 3-Close, 4-Quit): ');

    switch (lineRead) {
        case '1' : 
            // console.log('Option 1 Selected');
            OpenConnection();
            break;
        case '2' : 
            // console.log('Option 2 Selected');
            var data = readlineSync.question('Enter data to send: ');
            SendData(data);
            break;
        case '3' : 
            // console.log('Option 3 Selected');
            CloseConnection();
            break;
        case '4' : 
            // console.log('Option 4 Selected');
            return;
            break;
        default : 
            setTimeout(function() {
                menu();
            }, 0);            
            break;
    }
};

setTimeout(function() {
    menu();
}, 0);