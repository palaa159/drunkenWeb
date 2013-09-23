var connect = require('connect'),
	fs = require('fs'),
	util = require('util'),
	io = require('socket.io').listen(30051),
	// WS port
	request = require('request'),
	port = 30050; // HTTP port
connect.createServer(
connect.static(__dirname + '/public') // two underscores
).listen(port);
util.log('the server is running on port: ' + port);
// // socket stuff
io.sockets.on('connection', function(socket) {
	util.log('Ooooooh, someone just poked me :)');
	socket.on('gyro', function(data) {
		util.log(JSON.stringify(data));
		io.sockets.emit('dgyro', data);
	});
	// picking up website
	socket.on('sendweb', function(data) {
		request({
			uri: 'http://www.' + data.val
		}, function(error, response, body) {
			socket.emit('sendback', body);
		});
	});
});