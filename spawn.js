const async = require('async');
const path = require('path');
const fs = require('fs');
const spawn = require('child_process').spawn;

var childs = {};
function abort() {
	var alive = Object.keys(childs);
	console.log(`killing remaining pid(s): ${alive}`);
	alive.forEach((pid) => childs[pid].kill());
}

process.on('SIGINT', abort);
process.on('SIGTERM', abort);

async.parallel(
	process.argv.slice(2).map((cmd) => {
		return (callback) => {
			console.log(cmd);

			let opt = {};
			const argv = cmd.split(/\s+/);
			var name = path.basename(argv[0]);

			if(fs.existsSync(argv[0]+".js")) {
				argv.unshift("node");
			} else {
				const bin = path.resolve("node_modules", ".bin", argv[0]);
				if(fs.existsSync(bin)) {
					argv[0] = bin;
					opt['shell'] = true;
				}
			}

			const argv0 = argv.shift();
			const child = spawn(argv0, argv, opt);

			childs[child.pid] = child;

			child.stdout.on('data', (data) => {
				data.toString().trim().split(/\n/).forEach((row) =>
					console.log(`${name}: ${row}`));
			});

			child.stderr.on('data', (data) => {
				data.toString().trim().split(/\n/).forEach((row) =>
					console.log(`${name}: err: ${row}`));
			});

			child.on('close', (code, signal) => {
				delete childs[child.pid];
				if(code || signal)
					console.log(`${name} exited with ${code || signal}`);
				callback(code, name);
			});

		};
	}),
	(err, result) => {
		if (err) {
			abort();
			return;
		}
	}
);

