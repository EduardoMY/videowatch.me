var WebTorrent = require('webtorrent')
var fs = require('fs')
var client = new WebTorrent()

client.seed(file, function (torrent) {
  console.log('Client is seeding ' + torrent.magnetURI)
})
