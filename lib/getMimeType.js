
// require node modules
const https  = require('https');

// json file mime types
const mimeURL = 'https://gist.githubusercontent.com/AshHeskes/6038140/raw/27c8b1e28ce4c3aff0c0d8d3d7dbcb099a22c889/file-extension-to-mime-types.json';

const getMimeType = extension => {

	return new Promise((resolve, reject) => {
		
		https.get(mimeURL, response => {

			if(response.statusCode < 200 || response.statusCode > 299) {
				reject(`Error: Failed to load mime types json file: ${response.statusCode}`);
				console.log(`Error: Failed to load mime types json file: ${response.statusCode}`);
				// need return to stop code execution
				return false;
			}

			let data = '';

			// will recieve data by chunks
			response.on('data', dataChunk => {
				data += dataChunk;
			});

			response.on('end', () => {
				resolve(JSON.parse(data)[extension]);
			});
		})
		.on('error', (e) => {
			console.log(e);
		})

	});

};

module.exports = getMimeType;