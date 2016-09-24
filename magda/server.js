var express = require('express');
var app = express();
var path = require('path');
var videos = {};

app.get('/upload', function(req, res) {
    res.sendFile(path.join(__dirname + '/upload.html'));
});

app.get('/download', function (req, res) {
	res.sendFile(path.join(__dirname + '/download.html'));
});

app.get('/lobby', function (req, res) {
	res.sendFile(path.join(__dirname + '/lobby.html'));
});

app.get('/videos', function (req, res) {

})

app.listen(6969);