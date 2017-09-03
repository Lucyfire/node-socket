const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000


var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));


io.on('connection', (socket) => {
	console.log('New user connect');

	socket.on('disconnect', () => {
		console.log('User disconnected');
	});

	socket.on('createMessage', (msgData) => {
		console.log('Create Message', msgData);

		io.emit('newMessage', {
			'from': msgData.from,
			'text': msgData.text,
			'created': new Date().getTime()
		});
	});

});


server.listen(port,()=>{
	console.log('Server is up on port 3000');
});