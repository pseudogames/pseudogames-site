const http = require('http');
const fs = require('fs');
const Path = require('path');
const glob = require('glob');
const debounce = require('debounce');
const commonmark = require('commonmark')

const root = 'static/release';
var release = {};

var log = console.log;
function processFile(filename) {
	//console.log = filename == 'static/release/cave9/cave9.md' ? log : () => 1; // XXX debug
	console.log(filename);

	let regex = new RegExp(`^${root}/(\\w+)/.*?(\\.md)?$`);
	let part = filename.match(regex);
	if(!part) return;
	let id = part[1];
	let base = `${root}/${id}`;
	let index = part[2] ? filename : glob.sync(`${base}/*.md`)[0];

	// content
	if(!index) return;
	let content = fs.readFileSync(filename);
	if(!content) return;
	content = content.toString();

	// media
	let thumb;
	let image = glob.sync(`${base}/**/*.{jpeg,jpg,png,gif}`).filter( path => {
		let t = path.match(/thumb[^\/]*$/);
		if(t) thumb = path;
		return !t;
	}).map( path => ({type: "image", url: path}) );
	if(!thumb && image.length > 0) thumb = image[0].url;
	if(!thumb) return;
	let video = [];
	video = glob.sync(`${base}/**/*.mp4`).map( path => ({type: "video", url: path}) );
	let yt = [];
	content = content.replace(/http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/(?:watch\?v=|embed\/)|\.be\/)([\w\-\_]*)(&[\w\?=]*)?\r?\n/g, (_,id) => {
		yt.push({type: "youtube", id: id});
		return "";
	});

	// info
	let info = {
		thumb: thumb,
	};
	let title = content.match(/(.*)\r?\n===*\r?\n/);
	if(title) info.title = title[1];
	content.replace(/[\*\-] ([a-z]+)\s*:\s*(.+)/g, (_,k,v) => {
		info[k] = v;
		return _;
	});

	// links
	let web = glob.sync(`${base}/**/web*/`).map( path => `* [Play Now!](${path})\n` ).join("");
	let bin = glob.sync(`${base}/**/*.zip`).map( path => {
		let stat = fs.statSync(path);
		let name = Path.basename(path);
		let size = Math.round(stat["size"] / 1024 / 1024);
		let label = `* [${name} (${size}Mb)](${path})\n`;
		return label;
	}).join("");

	let injected = false;
	var inject = web + bin;
	content = content.replace(/\nlinks?\r?\n----*\r?\n/i, heading => { injected = true; return `${heading}${inject}` } );
	if(!injected) {
		content = content.replace(/\n\w+\r?\n----*\r?\n/i, heading => { injected = true; return `LINK\n----\n${inject}\n${heading}` } );
	}

	// result
	release[id] = {
		info: info,
		content: content,
		media: image.concat(video).concat(yt),
		};
		}

function normPath(path) {
	return path.replace(/\\/g, "/");
}

fs.watch(root, {recursive:true}, debounce((eventType, filename) => {
	processFile(root+"/"+normPath(filename));
}), 200, true);

glob(`${root}/*/*.md`, {}, (err,files) => {
	if(err) return console.log("err:", err);
	files.forEach(f => processFile(f));
});

let server = http.createServer(function(request, response) {
	let result = null;
	let method = request.method;
	let url = request.url;
	let param = url.match(/^\/api\/project\/?(\w+)?$/)
	if(param) {
		let id = param[1];
		if(id) {
			result = release[id];
		} else {
			let ids = Object.keys(release);
			result = ids.map(id => {
				let r = release[id].info;
				let label = r.title;
				if(r.jam) label += ` @ ${r.jam}`;
				if(r.date) label += `, ${r.date.substring(0,4)}`;
				return {
					id: id,
					label: label,
					cover: r.thumb,
					date: parseFloat((r.date || '1970-01-01').replace(/(\d+)(?:-(\d+)-(\d+))?/g,"$1.$2$3"))
				};
			}).sort((a,b) => b.date - a.date);
		}
	}

	response.writeHead(result ? 200 : 404, {
		'Access-Control-Allow-Origin': '*'
	});

	if(result) {
		response.write(JSON.stringify(result));
	}
	response.end();
}).listen(3001);

