var express = require('express');
var app = express();
var path = require('path');

app.get('/upload', function(req, res) {
    res.sendFile(path.join(__dirname + '/upload.html'));
});

app.get('/download', function (req, res) {
	res.sendFile(path.join(__dirname + '/download.html'));
});

app.listen(8080);