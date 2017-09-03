var socket = io();

socket.on('connect', function(){
	console.log('Connected to server');

	socket.emit('createMessage', {
		'from': 'client',
		'to' : 'to@example.com',
		'text': '<p>Hello right back at ya.</p>',
	});

});

socket.on('disconnect', function(){
	console.log('Disconnected from server');
});

socket.on('newMessage', function(email){
	console.log('Got new message', email);
});
