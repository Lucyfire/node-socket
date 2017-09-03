(function($){
	function updateUsersOnline(users){
		$('#users-online').html(users);
	};
	function updateScroll(id, force = false){
		var el = $(id);
		
		var lastMsgHeight = el.children('li:last-child()').height();
		
		var scrollTop = el.prop('scrollTop');
		var scrollHeight = el.prop('scrollHeight');
		var offsetHeight = el.prop('offsetHeight');
		
		if(offsetHeight + scrollTop + lastMsgHeight >= scrollHeight || force)
			el.scrollTop(scrollHeight);
	};
	function showMessageDate(){
		$(this).find('.date').toggle();
	};

	var socket = io();
	

	socket.on('connect', function(){
		console.log('Connected to server');
		username = socket.id;
		$('input[name=username').val(username);
	});

	socket.on('newUser', function(users){
		updateUsersOnline(users);
	});

	socket.on('disconnectUser', function(users){
		console.log(users);
		updateUsersOnline(users);
	});

	socket.on('disconnect', function(){
		console.log('Disconnected from server');

	});

	socket.on('newMessage', function(message){
		var template = $('#message-template').html();
		var html = Mustache.render(template, {
			from: message.from,
			text: message.text,
			class: message.from == username ? 'local' : 'external',
			created: moment(message.created).format('DD/MM/YYYY HH:mm:ss'),
		});
		$('#messages-list').append(html);

		// if(message.from == username)
		// 	updateScroll('#messages-list', true);
		// else
			updateScroll('#messages-list');
	});

	$('#username-form').on('submit' , function(e){
		e.preventDefault();
		username = $('input[name=username]').val();
	});
	$('#message-form').on('submit' , function(e){
		e.preventDefault();
		socket.emit('createMessage', {
			'from': username,
			'text': $('input[name=message]').val(),
		}, function(){
			$('input[name=message]').val('');
		});
	});


// Geolocation
var locationButton = $('#send-location');

locationButton.on('click', function(){
	if(!navigator.geolocation){
		return alert('Geolocation is not supported for your browser');
	}

	locationButton.attr('disabled','disabled').text('Sending Location...');

	navigator.geolocation.getCurrentPosition(function(position){
		locationButton.removeAttr('disabled').text('Send Location');
		socket.emit('createLocationMessage', {
			username: username,
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		}, function(){

		});
	}, function(){
		locationButton.removeAttr('disabled');
		alert('Unable to fetch location').text('Send Location');
	})
});



})(jQuery)