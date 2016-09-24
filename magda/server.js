var express = require('express');
var app = express();
var path = require('path');
var sqlite3 = require('sqlite3').verbose();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

app.post('/:userId/upload', function(req, res) {
  db = new sqlite3.Database("video.db")
  db.serialize(function() {
  db.run('insert into videos(usuario_fk, titulo, video_link, tumbnail) values(' + 
      req.params["userId"] + ', "' +
      req.body["titulo"] + '", "' +
      req.body["video"] + '", "' +
      req.body["tumbnail"] + 
  '")');
  })
  db.close();
});

app.get('/:userId/query', function(req, res) {
  db = new sqlite3.Database("video.db")
  db.serialize(function() {
    db.all('select * from videos where usuario_fk = ' + req.params["userId"], function(err, rows) {
      res.json(rows);
    })
  })
  db.close();

})

app.listen(6969);
