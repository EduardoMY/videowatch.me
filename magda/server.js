var express = require('express');
var app = express();
var path = require('path');
var sqlite3 = require('sqlite3').verbose();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');

var tokens = {};

app.get('/', function(req, res) {
    db = new sqlite3.Database("video.db");
/*    if(req.query!=={}){
	db.all("SELECT DISTINCT USER FROM VIDEOS LIKE  '%"+req.query.q+"%'  UNION SELECT TITLE, VIDEO FROM VIDEOS LIKE '%"+req.query.q+"&'", function (err, rows) {
	    res.render('homepage', {videos:rows});													      });
    }
    else{ */
	db.serialize(function() {
	    db.all('select rowid, title from videos limit 20', function(err, rows) {
		res.render('homepage', {
		    videos: rows
		});
	    });
	});
//    }

  db.close();
})

app.get('/users/:username', function(req, res) {
  db = new sqlite3.Database("video.db");
  var username = req.params['username'];
  db.serialize(function() {
    db.all('select title, user from videos where user = ' + '"' + username + '"', function(err, rows) {
      res.render('user', {
        username: rows.user,
        videos: rows
      })
    })
  })
})

app.get('/videos/:id', function(req, res) {
  db = new sqlite3.Database("video.db");
  var id = req.params['id'];
  db.serialize(function() {
    db.get('select * from videos where rowid = ' + id, function(err, row) {
      res.render('video', {
        title: row.title,
        magnet: row.video,
        username: row.user
      })
    })
  })
})

app.post('/login', function(req, res) {
  db = new sqlite3.Database("video.db")
  db.serialize(function() {
    db.get('select * from users where username = "' + req.body["user"] + '" and password = "' + req.body["password"] + '"', function(err, rows) {
      if(err) {
        console.log("error: " + err);
        res.json({login: false})
        return;
      }
      if(rows) {
        console.log("ok");
        var num = getRandomInt(1, 100000);
        tokens[req.body["user"]] = num;
        res.json({login: true, key : num });
        return;
      }
      else {
        res.sendStatus(404);
      }
    })
  })
  db.close();
});

app.post('/register', function(req, res) {
  db = new sqlite3.Database("video.db")
  db.serialize(function() {
    db.run('insert into users(username, password) values( "' + req.body["user"] + '", "' + req.body["password"] +'")', function(err, rows) {
      if(err) {
        res.sendStatus(404);
        
        console.log("errored  " + err);
        return;
      }
    })
  })
  db.close();
  console.log("okd");
  res.sendStatus(200);
});

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

      
app.post('/users/:user/new/:key', function(req, res) {
  var key = req.params["key"];
  var user = req.params["user"];
  if(tokens[user] != key) {
    res.send("error forbidden");
    return;
  }
  db = new sqlite3.Database("video.db")
  db.serialize(function() {
  db.run('insert into videos(user, title, video, tumbnail) values(' + 
      req.params["user"] + ', "' +
      req.body["title"] + '", "' +
      req.body["video"] + '", "' +
      req.body["tumbnail"] + 
  '")');
  })
  db.close();
  res.send("ok");
});

app.get('/:userId/query', function(req, res) {
  db = new sqlite3.Database("video.db")
  db.serialize(function() {
    db.all('select * from videos where user = ' + req.params["userId"], function(err, rows) {
      res.json(rows);
    })
  })
  db.close();

})

app.listen(6969);
