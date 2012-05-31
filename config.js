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
