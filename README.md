cobia-nvr is an open source Network Video Recorder for streaming and recording live IP cams.

Check out the live demo: http://nvrdemo.cobianet.com:8888

## Known Working Cameras

* UBNT Aircam - stream urls
<pre>
  1280X720 -- rtsp://camera-ip-address:554/live/ch00_0
  640X480 -- rtsp://camera-ip-address:554/live/ch01_0
  320X240 -- rtsp://camera-ip-address:554/live/ch02_0
  160X112 -- rtsp://camera-ip-address:554/live/ch03_0
</pre>

## Requirements

* node.js
* vlc
* ffmpeg
* x264
* Linux (any flavor)

## Installation

### Ubuntu

ubuntu-cobia-nvr-install.sh should install everything for you on Ubuntu from a fresh install.

This script will take a long time to run, it downloads and builds all of the above requirements from source.

Simply run this command on a Ubuntu box and wait for everything to finish building:
<pre>
wget https://raw.github.com/cobianet/cobia-nvr/master/ubuntu-cobia-nvr-install.sh
chmod +x ubuntu-cobia-nvr-install.sh
./ubuntu-cobia-nvr-install.sh
</pre>

Then you just need to edit config.js and run node app.js to start the server.

### Other Linux

Build node, vlc, ffmpeg and x264 from source.

Clone cobia-nvr from Github.

Then you just need to edit config.js and run node app.js to start the server.

## Configuration

Sample config.js :

<pre>
var config = {}

// config.cams - configure each camera here
// name : string - name of camera, uniquely identifies camera
// stream : string - stream url for camera
// streamWidth : int - image width of live MJPEG stream you will view
// streamHeight : int - image height of live MJPEG stream you will view
// streamFps : int - image FPS of live MJPEG stream you will view
// streamVb : int - image VB of live MJPEG stream you will view
// record : boolean - should this camera record h264 true/false
// recordScale : float - what scale should we record at
// recordFps : int - what FPS should we record at
// recordVb : int - what VB should we record at
// recordLimit : int - number of chunks to record, 1 chunk = 1 hour, 24 chunks = 1 day, 168 chunks = 1 week

// VB data usage estimates
// 128 Vb for 24 hours = ~1.4gb
// 128 Vb for 30 days = ~42gb

config.cams = [
{'name':'server_room','stream':'rtsp://192.168.80.4:554/live/ch01_0','streamWidth':640,'streamHeight':480,'streamFps':1,'streamVb':96,'record':false,'recordScale':1,'recordFps':.5,'recordVb':64,'recordLimit':10},
{'name':'main_room','stream':'rtsp://192.168.80.82:554/live/ch01_0','streamWidth':640,'streamHeight':480,'streamFps':1,'streamVb':96,'record':false,'recordScale':1,'recordFps':.5,'recordVb':64,'recordLimit':10},
{'name':'tech_room','stream':'rtsp://192.168.80.83:554/live/ch01_0','streamWidth':640,'streamHeight':480,'streamFps':1,'streamVb':96,'record':false,'recordScale':1,'recordFps':.5,'recordVb':64,'recordLimit':10},
];

// config.title - NVR title
config.title = 'Cobianet Cams NVR';

// config.externalAddress - IP or DNS
config.externalAddress = 'nvrdemo.cobianet.com';

module.exports = config;
</pre>

### Close estimates of disk usage

128 Vb for 24 hours = ~1.4gb

128 Vb for 30 days = ~42gb

