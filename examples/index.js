var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

var socketHelper = require('../lib/socker-helper');

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

http.listen(3000, function() {
  console.log('listening on *:3000');
});

function onConnection(socket, payload) {
  console.log('Connected', payload);
}

function onDisconnection(socket, payload) {
  console.log('Disconnected', payload);
}

var config = {
  clients: [],
  overrides: {
    newConnection: true
  }
};

socketHelper(io, onConnection, onDisconnection, config);
