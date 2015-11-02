var Server = require('ws').Server;
var server = new Server({ port: 6372 });

var clients = [];
var messages = [];

server.on('connection', function (socket) {
	clients.push(socket);
  if (clients.length === 1) {
    host(socket);
  } else {
    console.log(JSON.stringify(messages));
    messages.forEach(function (message) {
      socket.send(message);
    });
  }
	socket.on('close', function () {
    var index = clients.indexOf(socket);
		clients.splice(index, 1);
    if (index === 0) {
      messages = [];
      clients.forEach(function (target) {
        target.send(JSON.stringify('change-host'));
      });
      socket.removeListener('message', onMessage);
      if (clients.length > 0) {
        host(clients[0]);
      }
    }
	});
  function host(client) {
    client.send(JSON.stringify('host'));
    client.on('message', onMessage);
  }
  function onMessage (message) {
    messages.push(message);
    clients.forEach(function (target) {
      target.send(message);
    });
  }
});

