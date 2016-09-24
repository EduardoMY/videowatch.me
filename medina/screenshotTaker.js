var folderPath='/home/emedina/Downloads', file='SampleVideo_1280x720_2mb.mp4';
var ffmpeg = require('fluent-ffmpeg');
var command = ffmpeg(folderPath+'/'+file).
    on('filenames', function(filenames) {
	console.log('screenshots are ' + filenames.join(', '));
  }).
  on('end', function() {
    console.log('screenshots were saved');
  }).
  on('error', function(err) {
    console.log('an error happened: ' + err.message);
  }).
  // take 2 screenshots at predefined timemarks and size
    takeScreenshots({ count: 2, timemarks: [ '00:00:02.000', '1' ], size: '150x100' }, folderPath);








