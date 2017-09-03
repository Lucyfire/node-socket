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
// var userCount = 0;
// var users = [];
app.use(express.static(publicPath));


io.on('connection', (socket) => {
	// var user ={};
	console.log('New user connect');
	socket.emit('newMessage', generateMessage('Admin','Welcome to the chat room'));
	socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user has joined the chat room'));
	io.emit('newUser', socket.server.engine.clientsCount);

	socket.on('disconnect', () => {
		console.log('User disconnected');
		io.emit('disconnectUser', socket.server.engine.clientsCount);

	});

	socket.on('createMessage', (msgData, callback) => {
		console.log('Create Message', msgData);
		if(msgData.text == '') return callback();
		io.emit('newMessage', generateMessage(msgData.from, msgData.text));
		callback();
	});

	socket.on('createLocationMessage', (details) => {
		io.emit('newMessage', generateMessage(details.username,`<a target="_blank" href="https://www.google.com/maps?q=${details.latitude},${details.longitude}">I am here</a>`))
	});
	// socket.on('userLogin', (login, callback) => {
	// 	// console.log(socket);
	// 	user.username = login.username;
	// 	user.roomname = login.roomname;

	// 	console.log(user);
	// 	callback();
	// });

});


server.listen(port,()=>{
	console.log('Server is up on port 3000');
});