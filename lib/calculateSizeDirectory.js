// require node modules
const {execSync} = require('child_process');

const calculateSizeDirectory = itemFullStaticPath => {

	// clean path of all white spaces, globally
	const pathCleaned = itemFullStaticPath.replace(/\s/g, '\ ');
	let commandOutput;

	try {
		// get size in human readable format
		commandOutput = execSync(`du -sh "${pathCleaned}"`).toString();

		console.log(commandOutput);

	} catch(error) {
		console.log(`Error: ${error}`);

	}

	// remove empty spaces from output string
	let fileSize = commandOutput.replace(/\s/g, '');

	fileSize = [...fileSize.split('/')];

	// human readable format is first item in array
	const humanReadable = fileSize[0];

	console.log(humanReadable);

	// get char representing size unit
	// \d for digit
	// \. for periods
	const filesizeUnit = humanReadable.replace(/\d|\./g, '');
	console.log(filesizeUnit);

	// get value without char unit
	// a to z
	// case sensitive
	const filesizeNumber = humanReadable.replace(/[a-z]/i, '');
	console.log(filesizeNumber);

	return [humanReadable, 110 * 1000 * 1000];
}

module.exports = calculateSizeDirectory;