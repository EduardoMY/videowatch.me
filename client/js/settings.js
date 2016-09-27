let storage = require('electron-json-storage');

function loadPaths() {
  storage.get('paths', function(error, data) {
    window.torrentPaths = Object.getOwnPropertyNames(data).length !== 0 ? data : {paths: [], names: []};
    window.torrentPaths.paths.forEach(function(i, j) {
      client.seed(i, function(t){console.log(t.magnetURI)
        request.post({
          url:"http://videowatch.me/users/"+ window.username +"/update/"+window.torrentPaths.names[j] +"/" + window.key,
          body: { video: t.magnetURI},
          json:true
        }, function(err, response, body) {
          console.log(err);
          console.log(response.statusCode);
        })

      })});
  });


  /*for(let i = 0; i < window.torrentPaths.paths.length; i++) {
    client.seed(window.torrentPaths.paths[i]);
    }*/
}

function savePaths() {
  storage.set('paths', window.torrentPaths, function(error) {});
}
