var http = require('http');
var fs = require('fs');
var file = require('file');
var path = require('path');
var debounce = require('debounce');

var release = 'release';


function processFile(filename) {
	var param = filename.match(/^(\w+)[\/\\].*\.(\w+)$/);
	console.log(filename, param);
}

file.walkSync(release, (basedir,dirs,files) => {
	files.forEach(f => processFile(path.join(basedir,f)));
});

fs.watch(release, {recursive: true}, debounce((eventType, filename) => {
	processFile(filename);
}), 200, true);

var server = http.createServer(function(request, response) {
	var method = request.method;
	var url = request.url;
	console.log(url);
	var param = url.match(/^\/api\/project(?:\/(\w+))?$/)
	if(param) {
		console.log(param);
	}
	response.end();
}).listen(3001);
//"dev": "powershell kill -n node ; supervisor -w api.js api.js ; next",
