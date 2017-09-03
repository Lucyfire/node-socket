var socket = io();

$('#login-form').on('submit' , function(e){
	e.preventDefault();
	socket.emit('userLogin', {
		username: $('input[name="username"]').val(),
		roomname: $('input[name="roomname"]').val(),
	}, function(){
		window.location.href="/chat.html";
	});
});