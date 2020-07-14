// require node modules
const fs = require('fs');
const path = require('path');

// require files
const calculateSizeDirectory = require('./calculateSizeDirectory.js');

const buildMainContent = (fullStaticPath, pathname) => {
	let mainContent = '';
	let items;

	// name and link

	// loop through elements inside the folder
	try {
		items = fs.readdirSync(fullStaticPath);
		console.log(`items`);
		console.log(items);
	} catch(error) {
		console.log(`readdirSync error: ${error}`);
		return `<div class="alert alert-danger">Internal Server Error</div>`;
	}
	
	// get the following elements for each item:
		// name
		// icon
		// link to item
		// size
		// last modified
	items.forEach(item => {
		// link
		const link = path.join(pathname, item);

		// icon
		let icon;

		// getting stats of item
		const itemFullStaticPath = path.join(fullStaticPath, item);

		let stats;
		
		try {
			stats = fs.statSync(itemFullStaticPath);
		} catch(error) {
			console.log(`statSync error: ${error}`);
			mainContent = `<div class="alert alert-danger">Internal Server Error</div>`;
			return false;
		}

		if(stats.isDirectory()){
			icon = '<i class="far fa-folder"></i>';

			[itemSize, itemSizeBytes] = calculateSizeDirectory();

		} else if(stats.isFile()) {
			icon = '<i class="far fa-file"></i>';

			[itemSize, itemSizeBytes] = calculateSizeFile();
		}

		mainContent += `
			<tr>
				<td>
					<a href="${link}">
						${icon}
						${item}
					</a>
				</td>
				<td>100M</td>
				<td>12/08/2019, 09:00:00 PM</td>
			</tr>`;
	});

	return mainContent;
};

module.exports = buildMainContent;