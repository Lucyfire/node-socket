const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000


var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));


io.on('connection', (socket) => {
	console.log('New user connect');
	socket.emit('newMessage', generateMessage('Admin','Welcome to the chat room'));
	socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user has joined the chat room'));

	socket.on('disconnect', () => {
		console.log('User disconnected');
	});

	socket.on('createMessage', (msgData, callback) => {
		console.log('Create Message', msgData);
		io.emit('newMessage', generateMessage(msgData.from, msgData.text));
		callback('This is from the server');
	});

});


server.listen(port,()=>{
	console.log('Server is up on port 3000');
});