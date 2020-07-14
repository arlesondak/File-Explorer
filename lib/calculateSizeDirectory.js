// require node modules
const {execSync} = require('child_process');

const calculateSizeDirectory = itemFullStaticPath => {

	// clean path of all white spaces, globally
	const pathCleaned = itemFullStaticPath.replace(/\s/g, '\ ');

	try {
		// get size in human readable format
		const commandOutput = execSync(`du -sh "${pathCleaned}"`).toString();

		console.log(commandOutput);
		
	} catch(error) {
		console.log(`Error: ${error}`);

	}

	return ['110M', 110*1000*1000];
}

module.exports = calculateSizeDirectory;