var express = require('express');
var app = express();
var http = require('http').createServer(app);
var exec = require('child_process').exec;
var io = require('socket.io')(http);
var mqtt = require('mqtt')
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use('/assets', express.static(__dirname + '/assets'));
app.use(express.urlencoded());
  
var client  = mqtt.connect('mqtt://broker.hivemq.com');

// directions
app.get('/', function(req, res) {
	console.log("Received GET 'map' request");

	var lat = 50.80585115;
	var lng = 3.28435585537435;
	var dataDirections = { lat: lat, lng: lng };
	res.render('map', {data: dataDirections});
});

// reboot
app.get('/reboot', function(req, res) {
	console.log("Received GET 'reboot' request");
	restart();

	function execute(command, callback) {
		exec(command, function(error, stdout, stderr) {
			console.log("error: " + error);
			callback(stdout);
		});
	}

	function restart() {
		console.log("Reboot");
		execute('sudo reboot', function(callback) {});
	}
});

app.post('/', function(req, res) {
	io.emit('updateCoordinates', req.body);
	client.publish('focusrecour', JSON.stringify(req.body));
	console.log(req.body);
});

// Create HTTP server
http.listen(8080);
console.log("Server listening on focusrecour:8080");