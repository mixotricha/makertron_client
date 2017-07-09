	var ioc = require('socket.io-client');
	var socketc = ioc.connect('http://localhost:3000', {reconnect: true});

	// Add a connect listener
	socketc.on('connect', function (socket) {
 	   console.log('Connected!');
	});
	socketc.emit('OPENSCAD', 'test msg');
