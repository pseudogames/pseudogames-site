const http = require('http');
const fs = require('fs');
const glob = require('glob');
const debounce = require('debounce');

const root = 'static/release';
var release = {};

function parseMarkdown(filename) {
	let content = fs.readFileSync(filename);
	console.log(content);
	if(!content) return;
	let row = content.toString().split(/\r?\n\r?/);
	let info = {};
	info.title = row.shift();
	console.log(`'${row[0]}'`);
	if(!row.shift().match(/^=+$/)) return;
	console.log("magic");

	info['box'] = [];
	while(row.length > 0) {
		let part = row[0].match(/^\*\s+(\w+)\s*:\s*(.*)$/)
		if(part) {
			let [, key, value] = part;
			info.box.push(`${key}: ${value}`);
			info[key] = value;
			row.shift();
		} else {
			break;
		}
	}

	let sec = "description";
	while(row.length > 0) {
		let i = 0;
		let bodyBegin = i;

		for(;i<row.length;i++) { if(row[i].match(/\S/)) { break; } } // ltrim
		let textBegin = i;

		for(;i<row.length;i++) { if(row[i].match(/^-+$/)) { i--; break; } }
		let bodyEnd = i;

		for(i--;i>=0;i--) { if(row[i].match(/\S/)) { i++; break; } } // rtrim
		let textEnd = i;

		let raw = row.slice(textBegin, textEnd);
		row.splice(bodyBegin, bodyEnd);

		let section = [];
		let j = 0;
		for(i=0; i<raw.length; i++) {
			let r = raw[i];
			let empty = !r.match(/\S/);
			let r1 = r.replace(/^\* /,"");
			let bullet1 = r1 != r;
			let r2 = r1.replace(/^   - /,"");
			let bullet2 = r2 != r1;
			let colon = r.match(/:\s*$/);
			r = r2.trim();
			if(!empty) {

				if(section[j] !== undefined && Array.isArray(section[j]) != bullet2) {
					j++;
				}
				if(bullet2) {
					if(!section[j]) section[j] = [];
					section[j].push(r);
				} else {
					if(!section[j]) section[j] = "";
					else section[j] += " ";
					section[j] += r;
				}
				if(colon) section[j] = [section[j]];
			}
			if(empty || bullet1 && !colon) j++;
		}

		info[sec] = section;
		if(row.length > 0) {
			sec = row.shift().toLowerCase();
			row.shift(); // ----
		}
	}
		
	return info;
}


var log = console.log;
function processFile(filename) {
	console.log = filename == 'static/release/bettybooptetris/bettybooptetris.md' ? log : () => 1;
	console.log(filename);
	let regex = new RegExp(`^${root}/(\\w+)/.*?(\\.md)?$`);
	let part = filename.match(regex);
	console.log("part", part);
	if(!part) return;
	let id = part[1];
	let base = `${root}/${id}`;
	let index = part[2] ? filename : glob.sync(`${base}/*.md`)[0];
	console.log("index", index);
	if(!index) return;
	info = parseMarkdown(index);
	console.log("info", info);
	if(!info) return;
	info.image = glob.sync(`${base}/**/*.{jpeg,jpg,png,gif}`).filter( _ => {
		let t = _.match(/thumb/);
		if(t) info.thumb = _;
		return !t;
	});
	if(!info.thumb) info.thumb = info.image[0];
	info.video = glob.sync(`${base}/**/*.mp4`);
	info.web = glob.sync(`${base}/**/web*/`);
	info.bin = glob.sync(`${base}/**/*.zip`);
	release[id] = info;
}

glob(`${root}/*/*.md`, {}, (err,files) => {
	if(err) return console.log("err:", err);
	files.forEach(f => processFile(f));
});

function normPath(path) {
	return path.replace(/\\/g, "/");
}

fs.watch(root, {recursive:true}, debounce((eventType, filename) => {
	processFile(root+"/"+normPath(filename));
}), 200, true);

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
				let r = release[id];
				let label = r.title;
				if(r.jam) label += ` @ ${r.jam}`;
				if(r.date) label += `, ${r.date.substring(0,4)}`;
				return {
					id: id,
					label: label,
					cover: release[id].image[0],
					date: parseInt((release[id].date || '1970-01-01').replace(/-/g,""))
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

