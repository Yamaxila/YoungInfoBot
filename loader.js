/*
*
*   YoungInfoBot
*
*   Writen on "Teen Hack 2020"
*
*   by Yamaxila and his team.
*   (all peoples in about.js)
*
*/

let fs = require('fs');
let index = require('./index');

function load(dir, map) {
	fs.readdir(dir, (err, files) => {
		let jsfiles = files.filter(f => f.split('.').pop() === 'js');

		jsfiles.forEach((f, i) => {
			let m = require(`${dir}${f}`);

			if(!m.config){
				console.log(`${f} can't be loaded!`);
			} else {

				if (m.preload) {
					m.preload();
				}
				console.log(`${f} has been loaded!`);

				map.set(m.config.name, m);
			}
		});

	});
}

//Why not?
load(`./modules/`, index.modules);
load(`./commands/`, index.commands);
