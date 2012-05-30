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

Here's a good guide for building ffmpeg and x264 - https://ffmpeg.org/trac/ffmpeg/wiki/UbuntuCompilationGuide

I would also recommend building vlc from source.

## Installation

After you have installed the above requirements, follow these steps:

1. unpack source
2. cd cobia-nvr/
3. edit config.js
4. run node app.js

## Configuration

Check config.js for configuration options, here are the per camera options:

<pre>
name : string
stream : string
streamWidth : int
streamHeight : int
streamFps : int
streamVb : int
record : boolean
recordScale : float
recordFps : int
recordVb : int
</pre>

Close estimates of disk usage

128 Vb for 24 hours = ~1.4gb
128 Vb for 30 days = ~42gb

