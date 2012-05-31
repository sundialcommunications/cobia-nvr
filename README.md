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
* node-static (npm install node-static)
* vlc
* ffmpeg
* x264
* Linux (any flavor)

Here's a good guide for building ffmpeg and x264 - https://ffmpeg.org/trac/ffmpeg/wiki/UbuntuCompilationGuide

I would also recommend building vlc from source.

## Installation

After you have installed the above requirements, follow these steps:

1. download the zip tarball above for cobia-nvr and unzip it
2. cd cobia-nvr/
3. edit config.js
4. run node app.js

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
{'name':'server_room','stream':'rtsp://192.168.80.4:554/live/ch01_0','streamWidth':'320','streamHeight':'240','streamFps':'.5','streamVb':'128','record':false,'recordScale':1,'recordFps':.5,'recordVb':64,'recordLimit':10},
{'name':'main_room','stream':'rtsp://192.168.80.82:554/live/ch01_0','streamWidth':'320','streamHeight':'240','streamFps':'.5','streamVb':'128','record':true,'recordScale':1,'recordFps':.5,'recordVb':64,'recordLimit':10},
{'name':'tech_room','stream':'rtsp://192.168.80.83:554/live/ch01_0','streamWidth':'320','streamHeight':'240','streamFps':'.5','streamVb':'128','record':false,'recordScale':1,'recordFps':.5,'recordVb':64,'recordLimit':10},
{'name':'ir','stream':'rtsp://192.168.42.9:554/live/ch01_0','streamWidth':'320','streamHeight':'240','streamFps':'.5','streamVb':'128','record':false,'recordScale':1,'recordFps':.5,'recordVb':64,'recordLimit':10},
{'name':'ir1','stream':'rtsp://192.168.42.3:554/live/ch01_0','streamWidth':'320','streamHeight':'240','streamFps':'.5','streamVb':'128','record':false,'recordScale':1,'recordFps':.5,'recordVb':64,'recordLimit':10},
{'name':'ir2','stream':'rtsp://192.168.42.13:554/live/ch01_0','streamWidth':'320','streamHeight':'240','streamFps':'.5','streamVb':'128','record':false,'recordScale':1,'recordFps':.5,'recordVb':64,'recordLimit':10}
];

// config.title - NVR title
config.title = 'Cobianet Cams NVR';

module.exports = config;
</pre>

### Close estimates of disk usage

128 Vb for 24 hours = ~1.4gb

128 Vb for 30 days = ~42gb

