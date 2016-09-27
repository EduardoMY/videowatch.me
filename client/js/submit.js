function submitTorrent() {
  //window.torrentPaths.paths.push(window.lastFile);
  //savePaths();
  request.post({
    url:"http://videowatch.me/users/" + window.username +"/new/" + window.key,
    body: {title: $('#video-title').val() , video: window.magnetURI, tumbnail: ''},
    json:true
  })
}
