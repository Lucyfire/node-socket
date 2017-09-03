(function($){
	var socket = io();

	socket.on('connect', function(){
		console.log('Connected to server');

		

	});

	socket.on('disconnect', function(){
		console.log('Disconnected from server');
	});

	socket.on('newMessage', function(message){
		// console.log('Got new message', email);
		var li = $('<li></li>');
		li.text(`${message.from}: ${message.text}`);
		$('#messages-list').append(li);
	});

	$('#message-form').on('submit' , function(e){
		e.preventDefault();
		socket.emit('createMessage', {
			'from': $('input[name=username]').val(),
			'text': $('input[name=message]').val(),
		}, function(data){
			console.log('Got it', data);
			$('input[name=message]').val('');
		});
	});

})(jQuery)