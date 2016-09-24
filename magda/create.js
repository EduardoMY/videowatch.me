var createTorrent = require('create-torrent')
var fs = require('fs')
 
createTorrent(__dirname + 'test.txt', function (err, torrent) {
  if (!err) {
    fs.writeFile('my.torrent', torrent);
  }
  fs.writeFile('my.torrent', torrent);
})
