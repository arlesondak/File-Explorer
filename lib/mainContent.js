// require node modules
const fs = require('fs');
const path = require('path');

// require files
const calculateSizeDirectory = require('./calculateSizeDirectory.js');
const calculateSizeFile = require('./calculateSizeFile.js');

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

		// store item details in an object
		let itemDetails = {};

		// name
		itemDetails.name = item;
		// link
		const link = path.join(pathname, item);

		// icon
		let icon;

		// getting stats of item
		const itemFullStaticPath = path.join(fullStaticPath, item);

		let stats;
		
		try {
			itemDetails.stats = fs.statSync(itemFullStaticPath);
		} catch(error) {
			console.log(`statSync error: ${error}`);
			mainContent = `<div class="alert alert-danger">Internal Server Error</div>`;
			return false;
		}

		if(itemDetails.stats.isDirectory()){
			itemDetails.icon = '<i class="far fa-folder"></i>';

			[itemDetails.size, itemDetails.sizeBytes] = calculateSizeDirectory(itemFullStaticPath);

		} else if(itemDetails.stats.isFile()) {
			itemDetails.icon = '<i class="far fa-file"></i>';

			[itemDetails.size, itemDetails.sizeBytes] = calculateSizeFile(itemDetails.stats);
		}

		// when was the file last change? (unix timestamp)
		itemDetails.timeStamp = itemDetails.stats.mtimeMs;

		// convert timestamp to a data
		itemDetails.date = new Date(itemDetails.timeStamp);

		itemDetails.date = itemDetails.date.toLocaleString();

		console.log(itemDetails.date);

		mainContent += `
			<tr data-name="${itemDetails.name}" data-size="${itemDetails.sizeBytes}" data-time="${itemDetails.timeStamp}">
				<td>
					<a href="${link}">
						${itemDetails.icon}
						${item}
					</a>
				</td>
				<td>${itemDetails.size}</td>
				<td>${itemDetails.date}</td>
			</tr>`;
	});

	return mainContent;
};

module.exports = buildMainContent;