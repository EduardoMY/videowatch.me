//Simple Paths and fileNames
var folderPath='/home/emedina/Downloads', file='SampleVideo_1280x720_2mb.mp4', ffprobePath='/usr/bin/ffprobe';

//resolution of the thumbnails
var resolution='1280x720';
    
//Set the ffmpeg variable
var ffmpeg = require('fluent-ffmpeg');

getData();

function getData(){
  ffmpeg.setFfprobePath(ffprobePath);
    ffmpeg.ffprobe(folderPath+'/'+file, function(err, metadata) {
    if (err) {
        console.error(err);
    } else {
	makeScreenShots(metadata.format.duration);
    }
    });

}

function makeScreenShots(duration){
    console.log(duration);
    var command = new ffmpeg(folderPath+'/'+file).
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
	takeScreenshots({ count: 3, timemarks: [ duration*.2, duration*.5, duration*.8  ], size: resolution }, folderPath);
/*
    console.log(duration*.2);
    console.log(duration*.5);
    console.log(duration*.8);
*/
}
