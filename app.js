var util  = require('util'),
    spawn = require('child_process').spawn,
    fs = require('fs'),
    libpath = require('path'),
    url = require('url'),
    static = require('node-static'),
    config = require('./config'),
    exec = require('child_process').exec,
    mime = require('mime');

var path = '.';
var cams = config.cams;

function dirExistsSync (d) { 
  try { fs.statSync(d).isDirectory() } 
  catch (er) { return false } 
} 

for (i=0;i<cams.length;i++) {
	console.log(cams[i].stream);

	// check that directory exists
	if (dirExistsSync('res/data/'+cams[i].name) == false) {
		// create directory
		console.log('creating directory ./res/data/'+cams[i].name);
		fs.mkdirSync('./res/data/'+cams[i].name);
	}

	// spawn each of the main vlc processes
	var args = cams[i].stream+' -I dummy --no-sout-audio --sout #transcode{vcodec=MJPG,vb='+cams[i].streamVb+',width='+cams[i].streamWidth+',height='+cams[i].streamHeight+',acodec=none,fps='+cams[i].streamFps+'}:standard{access=http{mime=multipart/x-mixed-replace;boundary=--7b3cc56e5f51db803f790dad720ed50a},mux=mpjpeg,dst=0.0.0.0:'+(5555+i)+'/p.mjpg}';
	var sa = args.split(' ');

	cams[i].spawn = spawn('cvlc', sa);

	cams[i].spawn.stdout.on('data', function (data) {
		//console.log('stdout: ' + data);
	});

	cams[i].spawn.stderr.on('data', function (data) {
		//console.log('stderr: ' + data);
	});

	cams[i].spawn.on('exit', function (code) {
		console.log('child process exited with code ' + code);
	});

}

var fileServer = new static.Server('./');

function getHeader() {
	return '<!DOCTYPE html><html><head><title>'+config.title+'</title><link type="text/css" media="screen" rel="stylesheet" href="/res/screen.css" /></head><body><div id="header"><h2 class="title">'+config.title+'</h2><a href="/">All Cameras</a></div><div id="content">';
}

function getFooter() {
	return '</div></body></html>';
}

// start the server
require('http').createServer(function (request, response) {

	var uri = url.parse(request.url).pathname;
	var filename = libpath.join(path, uri);

	console.log('uri: '+uri);
	console.log('filename: '+filename);

	// if this is a request to /res then return file
	if (uri[0] == '/' && uri[1] == 'r' && uri[2] == 'e' && uri[3] == 's') {
		request.addListener('end', function () {
			fileServer.serve(request, response);
		});

	// otherwise use logic
	} else {

		var body = '';
		request.on('data', function (data) {
			body += data;
		});
		request.on('end', function () {

			if (request.url == '/') {

				// create response
				var r = getHeader();

				for (i=0;i<cams.length;i++) {
					console.log('adding 1 cam');
					r += '<div class="cam"><span class="overlay"><h2>'+cams[i].name+'</h2><p>';
					r += '<a href="cam/'+cams[i].name+'">Details</a>';
					r += '<br /><span style="font-size: .6em;">';
					if (cams[i].record == true) {
						r += 'recording';
					} else {
						r += 'not recording';
					}
					r += '</span></p></span>';
					r += '<img width="'+cams[i].streamWidth+'" height="'+cams[i].streamHeight+'" src="http://69.94.230.84:'+(5555+i)+'/p.mjpg" />';
					r += '</div>';
				}

				r += getFooter();

				response.writeHead(200, { 'Content-Type': 'text/html' });
				response.write(r);
				response.end();

			} else if (request.url[0] == '/' && request.url[1] == 'c' && request.url[2] == 'a' && request.url[3] == 'm') {

				console.log('detail request');

				var s = request.url.split('/');
				var camName = s[s.length-1];
				var con = -1;

				for (i=0;i<cams.length;i++) {
					if (cams[i].name == camName) {
						con = i;
					}
				}

				console.log(camName+' with conId '+con);

				if (con >= 0) {
					// return cam detail

					var r = getHeader();

					r += '<h2>'+cams[con].name+'</h2>';
					r += '<div class="cam" style="float: right; margin-right: 100px;">';
					r += '<img width="'+cams[con].streamWidth+'" height="'+cams[con].streamHeight+'" src="http://69.94.230.84:'+(5555+con)+'/p.mjpg" />';
					r += '</div><div class="camDetail"><h2>Details</h2><ul>';

					r += '<li><strong>Streaming</strong></li>';
					gbPerMoStr = Math.round((((cams[con].streamVb*125)*60*60*24*30)/1073741824)*100)/100;
					r += '<li>VB: '+cams[con].streamVb+' @ '+gbPerMoStr+'GB per month</li>';
					r += '<li>Width: '+cams[con].streamWidth+'</li>';
					r += '<li>Height: '+cams[con].streamHeight+'</li>';
					r += '<li>FPS: '+cams[con].streamFps+'</li>';

					r += '<li><strong>Recording : ';
					if (cams[con].record == true) {
						r += 'ON';
					} else {
						r += 'OFF';
					}
					r += '</strong></li>';

					// 1 Vb = 125 bytes per second
					gbPerMoRec = Math.round((((cams[con].recordVb*125)*60*60*24*30)/1073741824)*100)/100;
					r += '<li>VB:'+cams[con].recordVb+' @ '+gbPerMoRec+'GB per month</li>';
					r += '<li>Scale: '+cams[con].recordScale+'</li>';
					r += '<li>FPS: '+cams[con].recordFps+'</li>';

					r += '<li><strong>Hourly Recordings</strong></li>';

					var fArr = fs.readdirSync('res/data/'+cams[con].name);
					console.log(fArr);

					for (var i=0;i<fArr.length;i++) {

						r += '<li><a href="/res/data/'+cams[con].name+'/'+fArr[i]+'">'+fArr[i]+'</a></li>';

					}

					r += '</ul></div>';

					r += getFooter();

					response.writeHead(200, { 'Content-Type': 'text/html' });
					response.write(r);
					response.end();

				}

			}
		});

	}

}).listen(8888);

console.log('listening on port 8888');

function hourly() {

	// save hourly recorded chunks
	console.log('starting new hourly recording');

	for (i=0;i<cams.length;i++) {

		if (cams[i].record == true) {

			console.log('starting hourly chunk for '+cams[i].name);

			var ts = String(Math.round(new Date().getTime() / 1000));

			// note timeout of 1 hour, will kill process
			//var cmd = 'cvlc http://127.0.0.1:'+(5555+i)+'/p.mjpg -Idummy --no-sout-audio --sout \'#transcode{vcodec=MJPG,vb='+cams[i].recordVb+',scale='+cams[i].recordScale+',acodec=none,fps='+cams[i].recordFps+'}:std{mux=asf,access=file,dst=res/data/'+cams[i].name+'-'+ts+'.asf}\'';
			var cmd = 'cvlc http://127.0.0.1:'+(5555+i)+'/p.mjpg -Idummy --no-sout-audio --sout \'#transcode{vcodec=h264,vb='+cams[i].recordVb+',scale='+cams[i].recordScale+',acodec=none,fps='+cams[i].recordFps+'}:std{mux=mp4,access=file,dst=res/data/'+cams[i].name+'/'+ts+'.mp4}\'';
			var pid = exec(cmd, { timeout: 3600000 }, function (error, stdout, stderr) {
				//console.log('stdout: ' + stdout);
				//console.log('stderr: ' + stderr);
				if (error !== null) {
					console.log('exec error: ' + error);
				}
			});

		}
	}
}

hourly();

setInterval(function() {
	hourly();
}, 3600000);

// grab snapshots every minute
