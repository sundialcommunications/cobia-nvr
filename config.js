var config = {}

// name : string
// stream : string
// streamWidth : int
// streamHeight : int
// streamFps : int
// streamVb : int
// record : boolean
// recordScale : float
// recordFps : int
// recordVb : int

// 128 Vb for 24 hours = ~1.4gb
// 128 Vb for 30 days = ~42gb

config.cams = [
{'name':'server_room','stream':'rtsp://192.168.80.4:554/live/ch01_0','streamWidth':'320','streamHeight':'240','streamFps':'.5','streamVb':'128','record':false,'recordScale':1,'recordFps':.5,'recordVb':64},
{'name':'main_room','stream':'rtsp://192.168.80.82:554/live/ch01_0','streamWidth':'320','streamHeight':'240','streamFps':'.5','streamVb':'128','record':true,'recordScale':1,'recordFps':.5,'recordVb':64},
{'name':'tech_room','stream':'rtsp://192.168.80.83:554/live/ch01_0','streamWidth':'320','streamHeight':'240','streamFps':'.5','streamVb':'128','record':false,'recordScale':1,'recordFps':.5,'recordVb':64},
{'name':'ir','stream':'rtsp://192.168.42.9:554/live/ch01_0','streamWidth':'320','streamHeight':'240','streamFps':'.5','streamVb':'128','record':false,'recordScale':1,'recordFps':.5,'recordVb':64},
{'name':'ir1','stream':'rtsp://192.168.42.3:554/live/ch01_0','streamWidth':'320','streamHeight':'240','streamFps':'.5','streamVb':'128','record':false,'recordScale':1,'recordFps':.5,'recordVb':64},
{'name':'ir2','stream':'rtsp://192.168.42.13:554/live/ch01_0','streamWidth':'320','streamHeight':'240','streamFps':'.5','streamVb':'128','record':false,'recordScale':1,'recordFps':.5,'recordVb':64},
{'name':'salinacruzmx','stream':'rtsp://192.168.20.18:8554/live/ch01_0','streamWidth':'640','streamHeight':'480','streamFps':'.5','streamVb':'256','record':false,'recordScale':1,'recordFps':.5,'recordVb':64}
];

config.title = 'Cobianet Cams NVR devenv';

module.exports = config;
