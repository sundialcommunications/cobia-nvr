var fs = require('fs'),
    //sys = require('sys'),
    events = require('events'),
    buffer = require('buffer'),
    http = require('http'),
    url = require('url'),
    path = require('path');

this.version = [0, 5, 9];

var mime = new Object();
mime.contentTypes = {
  "aiff": "audio/x-aiff",
  "arj": "application/x-arj-compressed",
  "asf": "video/x-ms-asf",
  "asx": "video/x-ms-asx",
  "au": "audio/ulaw",
  "avi": "video/x-msvideo",
  "bcpio": "application/x-bcpio",
  "ccad": "application/clariscad",
  "cod": "application/vnd.rim.cod",
  "com": "application/x-msdos-program",
  "cpio": "application/x-cpio",
  "cpt": "application/mac-compactpro",
  "csh": "application/x-csh",
  "css": "text/css",
  "deb": "application/x-debian-package",
  "dl": "video/dl",
  "doc": "application/msword",
  "drw": "application/drafting",
  "dvi": "application/x-dvi",
  "dwg": "application/acad",
  "dxf": "application/dxf",
  "dxr": "application/x-director",
  "etx": "text/x-setext",
  "ez": "application/andrew-inset",
  "fli": "video/x-fli",
  "flv": "video/x-flv",
  "gif": "image/gif",
  "gl": "video/gl",
  "gtar": "application/x-gtar",
  "gz": "application/x-gzip",
  "hdf": "application/x-hdf",
  "hqx": "application/mac-binhex40",
  "html": "text/html",
  "ice": "x-conference/x-cooltalk",
  "ico": "image/x-icon",
  "ief": "image/ief",
  "igs": "model/iges",
  "ips": "application/x-ipscript",
  "ipx": "application/x-ipix",
  "jad": "text/vnd.sun.j2me.app-descriptor",
  "jar": "application/java-archive",
  "jpeg": "image/jpeg",
  "jpg": "image/jpeg",
  "js": "text/javascript",
  "json": "application/json",
  "latex": "application/x-latex",
  "less": "text/css",
  "lsp": "application/x-lisp",
  "lzh": "application/octet-stream",
  "m": "text/plain",
  "m3u": "audio/x-mpegurl",
  "man": "application/x-troff-man",
  "manifest": "text/cache-manifest",
  "me": "application/x-troff-me",
  "midi": "audio/midi",
  "mif": "application/x-mif",
  "mime": "www/mime",
  "movie": "video/x-sgi-movie",
  "mp4": "video/mp4",
  "mpg": "video/mpeg",
  "mpga": "audio/mpeg",
  "ms": "application/x-troff-ms",
  "nc": "application/x-netcdf",
  "oda": "application/oda",
  "ogm": "application/ogg",
  "pbm": "image/x-portable-bitmap",
  "pdf": "application/pdf",
  "pgm": "image/x-portable-graymap",
  "pgn": "application/x-chess-pgn",
  "pgp": "application/pgp",
  "pm": "application/x-perl",
  "png": "image/png",
  "pnm": "image/x-portable-anymap",
  "ppm": "image/x-portable-pixmap",
  "ppz": "application/vnd.ms-powerpoint",
  "pre": "application/x-freelance",
  "prt": "application/pro_eng",
  "ps": "application/postscript",
  "qt": "video/quicktime",
  "ra": "audio/x-realaudio",
  "rar": "application/x-rar-compressed",
  "ras": "image/x-cmu-raster",
  "rgb": "image/x-rgb",
  "rm": "audio/x-pn-realaudio",
  "rpm": "audio/x-pn-realaudio-plugin",
  "rtf": "text/rtf",
  "rtx": "text/richtext",
  "scm": "application/x-lotusscreencam",
  "set": "application/set",
  "sgml": "text/sgml",
  "sh": "application/x-sh",
  "shar": "application/x-shar",
  "silo": "model/mesh",
  "sit": "application/x-stuffit",
  "skt": "application/x-koan",
  "smil": "application/smil",
  "snd": "audio/basic",
  "sol": "application/solids",
  "spl": "application/x-futuresplash",
  "src": "application/x-wais-source",
  "stl": "application/SLA",
  "stp": "application/STEP",
  "sv4cpio": "application/x-sv4cpio",
  "sv4crc": "application/x-sv4crc",
  "svg": "image/svg+xml",
  "swf": "application/x-shockwave-flash",
  "tar": "application/x-tar",
  "tcl": "application/x-tcl",
  "tex": "application/x-tex",
  "texinfo": "application/x-texinfo",
  "tgz": "application/x-tar-gz",
  "tiff": "image/tiff",
  "tr": "application/x-troff",
  "tsi": "audio/TSP-audio",
  "tsp": "application/dsptype",
  "tsv": "text/tab-separated-values",
  "txt": "text/plain",
  "unv": "application/i-deas",
  "ustar": "application/x-ustar",
  "vcd": "application/x-cdlink",
  "vda": "application/vda",
  "vivo": "video/vnd.vivo",
  "vrm": "x-world/x-vrml",
  "wav": "audio/x-wav",
  "wax": "audio/x-ms-wax",
  "wma": "audio/x-ms-wma",
  "wmv": "video/x-ms-wmv",
  "wmx": "video/x-ms-wmx",
  "wrl": "model/vrml",
  "wvx": "video/x-ms-wvx",
  "xbm": "image/x-xbitmap",
  "xlw": "application/vnd.ms-excel",
  "xml": "text/xml",
  "xpm": "image/x-xpixmap",
  "xwd": "image/x-xwindowdump",
  "xyz": "chemical/x-pdb",
  "zip": "application/zip"
};

var util = new Object();

util.mstat = function (dir, files, callback) {
    (function mstat(files, stats) {
        var file = files.shift();

        if (file) {
            fs.stat(path.join(dir, file), function (e, stat) {
                if (e) {
                    callback(e);
                } else {
                    mstat(files, stats.concat([stat]));
                }
            });
        } else {
            callback(null, {
                size: stats.reduce(function (total, stat) {
                    return total + stat.size;
                }, 0),
                mtime: stats.reduce(function (latest, stat) {
                    return latest > stat.mtime ? latest : stat.mtime;
                }, 0),
                ino: stats.reduce(function (total, stat) {
                    return total + stat.ino;
                }, 0)
            });
        }
    })(files.slice(0), []);
};

var serverInfo = 'node-static';

// In-memory file store
this.store = {};
this.indexStore = {};

this.Server = function (root, options) {
    if (root && (typeof(root) === 'object')) { options = root, root = null }

    this.root    = path.resolve(root || '.');
    this.options = options || {};
    this.cache   = 3600;

    this.defaultHeaders  = {};
    this.options.headers = this.options.headers || {};

    if ('cache' in this.options) {
        if (typeof(this.options.cache) === 'number') {
            this.cache = this.options.cache;
        } else if (! this.options.cache) {
            this.cache = false;
        }
    }

    if (this.cache !== false) {
        this.defaultHeaders['Cache-Control'] = 'max-age=' + this.cache;
    }
    this.defaultHeaders['Server'] = serverInfo;

    for (var k in this.defaultHeaders) {
        this.options.headers[k] = this.options.headers[k] ||
                                  this.defaultHeaders[k];
    }
};

this.Server.prototype.serveDir = function (pathname, req, res, finish) {
    var htmlIndex = path.join(pathname, 'index.html'),
        that = this;

    fs.stat(htmlIndex, function (e, stat) {
        if (!e) {
            that.respond(null, 200, {}, [htmlIndex], stat, req, res, finish);
        } else {
            if (pathname in exports.store) {
                streamFiles(exports.indexStore[pathname].files);
            } else {
                // Stream a directory of files as a single file.
                fs.readFile(path.join(pathname, 'index.json'), function (e, contents) {
                    if (e) { return finish(404, {}) }
                    var index = JSON.parse(contents);
                    exports.indexStore[pathname] = index;
                    streamFiles(index.files);
                });
            }
        }
    });
    function streamFiles(files) {
        util.mstat(pathname, files, function (e, stat) {
            that.respond(pathname, 200, {}, files, stat, req, res, finish);
        });
    }
};
this.Server.prototype.serveFile = function (pathname, status, headers, req, res) {
    var that = this;
    var promise = new(events.EventEmitter);

    pathname = this.resolve(pathname);

    fs.stat(pathname, function (e, stat) {
        if (e) {
            return promise.emit('error', e);
        }
        that.respond(null, status, headers, [pathname], stat, req, res, function (status, headers) {
            that.finish(status, headers, req, res, promise);
        });
    });
    return promise;
};
this.Server.prototype.finish = function (status, headers, req, res, promise, callback) {
    var result = {
        status:  status,
        headers: headers,
        message: http.STATUS_CODES[status]
    };

    headers['Server'] = serverInfo;

    if (!status || status >= 400) {
        if (callback) {
            callback(result);
        } else {
            if (promise.listeners('error').length > 0) {
                promise.emit('error', result);
            }
            res.writeHead(status, headers);
            res.end();
        }
    } else {
        // Don't end the request here, if we're streaming;
        // it's taken care of in `prototype.stream`.
        if (status !== 200 || req.method !== 'GET') {
            res.writeHead(status, headers);
            res.end();
        }
        callback && callback(null, result);
        promise.emit('success', result);
    }
};

this.Server.prototype.servePath = function (pathname, status, headers, req, res, finish) {
    var that = this,
        promise = new(events.EventEmitter);

    pathname = this.resolve(pathname);

    // Only allow GET and HEAD requests
    if (req.method !== 'GET' && req.method !== 'HEAD') {
        finish(405, { 'Allow': 'GET, HEAD' });
        return promise;
    }

    // Make sure we're not trying to access a
    // file outside of the root.
    if (pathname.indexOf(that.root) === 0) {
        fs.stat(pathname, function (e, stat) {
            if (e) {
                finish(404, {});
            } else if (stat.isFile()) {      // Stream a single file.
                that.respond(null, status, headers, [pathname], stat, req, res, finish);
            } else if (stat.isDirectory()) { // Stream a directory of files.
                that.serveDir(pathname, req, res, finish);
            } else {
                finish(400, {});
            }
        });
    } else {
        // Forbidden
        finish(403, {});
    }
    return promise;
};
this.Server.prototype.resolve = function (pathname) {
    return path.resolve(path.join(this.root, pathname));
};
this.Server.prototype.serve = function (req, res, callback) {
    var that = this,
        promise = new(events.EventEmitter);
    
    var pathname = decodeURI(url.parse(req.url).pathname);

    var finish = function (status, headers) {
        that.finish(status, headers, req, res, promise, callback);
    };

    process.nextTick(function () {
        that.servePath(pathname, 200, {}, req, res, finish).on('success', function (result) {
            promise.emit('success', result);
        }).on('error', function (err) {
            promise.emit('error');
        });
    });
    if (! callback) { return promise }
};

this.Server.prototype.respond = function (pathname, status, _headers, files, stat, req, res, finish) {
    var mtime   = Date.parse(stat.mtime),
        key     = pathname || files[0],
        headers = {};

    // Copy default headers
    for (var k in this.options.headers) {  headers[k] = this.options.headers[k] }

    headers['Etag']          = JSON.stringify([stat.ino, stat.size, mtime].join('-'));
    headers['Date']          = new(Date)().toUTCString();
    headers['Last-Modified'] = new(Date)(stat.mtime).toUTCString();

    // Conditional GET
    // If the "If-Modified-Since" or "If-None-Match" headers
    // match the conditions, send a 304 Not Modified.
    if (req.headers['if-none-match'] === headers['Etag'] ||
        Date.parse(req.headers['if-modified-since']) >= mtime) {
        finish(304, headers);
    } else if (req.method === 'HEAD') {
        finish(200, headers);
    } else {
        headers['Content-Length'] = stat.size;
        headers['Content-Type']   = mime.contentTypes[path.extname(files[0]).slice(1)] ||
                                   'application/octet-stream';

        for (var k in _headers) { headers[k] = _headers[k] }

        res.writeHead(status, headers);

        // If the file was cached and it's not older
        // than what's on disk, serve the cached version.
        if (this.cache && (key in exports.store) &&
            exports.store[key].stat.mtime >= stat.mtime) {
            res.end(exports.store[key].buffer);
            finish(status, headers);
        } else {
            this.stream(pathname, files, new(buffer.Buffer)(stat.size), res, function (e, buffer) {
                if (e) { return finish(500, {}) }
                exports.store[key] = {
                    stat:      stat,
                    buffer:    buffer,
                    timestamp: Date.now()
                };
                finish(status, headers);
            });
        }
    }
};

this.Server.prototype.stream = function (pathname, files, buffer, res, callback) {
    (function streamFile(files, offset) {
        var file = files.shift();

        if (file) {
            file = file[0] === '/' ? file : path.join(pathname || '.', file);

            // Stream the file to the client
            fs.createReadStream(file, {
                flags: 'r',
                mode: 0666
            }).on('data', function (chunk) {
                chunk.copy(buffer, offset);
                offset += chunk.length;
            }).on('close', function () {
                streamFile(files, offset);
            }).on('error', function (err) {
                callback(err);
                console.error(err);
            }).pipe(res, { end: false });
        } else {
            res.end();
            callback(null, buffer, offset);
        }
    })(files.slice(0), 0);
};
