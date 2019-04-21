var youtubedl = require('youtube-dl');
var express = require('express');
var app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use('/assets', express.static(__dirname + '/assets'));


// --- Routes ---
// index
app.get('/', function(req, res) {
	console.log("Received GET 'index' request");
	var dataIndex = {};
	res.render('index', {data: dataIndex});
});

// directions
app.get('/directions', function(req, res) {
	console.log("Received GET 'map' request");

	var lat = 50.85433;
	var lng = 2.86170;
	var dataDirections = { lat: lat, lng: lng };
	res.render('map', {data: dataDirections});
});

// youtube
app.get('/youtube', function(req, res) {
	console.log("Received GET 'youtube' request");

	// Download video
	var video = youtubedl("https://www.youtube.com/watch?v=zp9Da20n0_k");

	video.on('info', function(info) {
		console.log('Download started:');
		console.log(`filename: ${info._filename}`);
		console.log(`size: ${info.size}`);
	});

	video.on('end', function() {
		console.log('Download complete!');
	});

	var dataYoutube = {};
	res.render('youtube', {data: dataYoutube});
});

// Create HTTP server
app.listen(8080);
console.log("Server listening on focusrecour:8080");