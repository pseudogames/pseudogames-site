const http = require('http');
const fs = require('fs');
const glob = require('glob');
const debounce = require('debounce');

const root = 'release';
var release = {};

function parseMarkdown(filename) {
	let content = fs.readFileSync(filename);
	if(!content) return;
	let row = content.toString().split(/\n\r?/);
	let info = {};
	info.title = row.shift();
	if(!row.shift().match(/^=+$/)) return;

	info['data'] = [];
	while(row.length > 0) {
		let part = row[0].match(/^\*\s+(\w+)\s*:\s*(.*)$/)
		if(part) {
			info.data.push(`${part[1]}: ${part[2]}`);
			info[part[1]] = part[2];
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
			r = r.replace(/^\* /,"");
			let bullet = r != raw[i];
			if(!empty) {
				if(!section[j]) section[j] = "";
				else section[j] += " ";
				section[j] += r.trim();
			}
			if(empty || bullet) j++;
		}

		info[sec] = section;
		if(row.length > 0) {
			sec = row.shift().toLowerCase();
			row.shift(); // ----
		}
	}
		
	return info;
}


function processFile(filename) {
	let regex = new RegExp(`^${root}/(\\w+)/.*?(\\.md)?$`);
	let part = filename.match(regex);
	if(!part) return;
	let id = part[1];
	let base = `${root}/${id}`;
	let index = part[2] ? filename : glob.sync(`${base}/*.md`)[0];
	if(!index) return;
	info = parseMarkdown(index);
	if(!info) return;
	info.media = glob.sync(`${base}/**/*.{jpeg,jpg,png,gif,mp4}`);
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
	console.log(url, param);
	if(param) {
		let id = param[1];
		if(id) {
			result = release[id];
		} else {
			let ids = Object.keys(release);
			result = ids.map(id => ({
				id: id,
				label: `${release[id].title} @ ${release[id].jam}, ${release[id].date}`,
				date: parseInt((release[id].date || '1970-01-01').replace(/-/g,""))
			})).sort((a,b) => a.date - b.date);
		}
	}

	if(result) {
		response.write(JSON.stringify(result));
	} else {
		response.writeHead(404);
	}
	response.end();
}).listen(3001);

