// server
var socket = io.connect('http://ec2-75-101-237-143.compute-1.amazonaws.com:30051');
$('#firstSubmit').click(function() {
	socket.emit('sendweb', {
		'val': $('#firstInput').val()
	});
	rec();
});

function rec() {
socket.on('sendback', function(data) {
	$('#firstPage').remove();
	$('#canvas').html(data);
	
});
	setTimeout(function() {
		socket.on('dgyro', function(data) {
		active(Math.abs(data.LR)/10);
	});
	}, 3000);
}

setInterval(function() {
	$('canvas').remove();
}, 500);

// when active
function active(a) {
	console.log('glitch!');
	$('canvas').remove();
	$('#canvas')
	.clone()
	.css({
		'position': 'absolute',
		'left': 0,
		'top': 0,
		'z-index': 9
	})
	.glitch('', {
		effect: "fade",
		amount: a
	})
	.appendTo('body');
}

