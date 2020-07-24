// require node modules
const {execSync} = require('child_process');

const calculateSizeFile = stats => {

	// size in bytes
	const fileSizeBytes = stats.size;
	const units = "BKMGT";
	const index = Math.floor(Math.log10(fileSizeBytes)/3);
	const fileSizeHuman = (fileSizeBytes/Math.pow(1000, index)).toFixed(2);

	const unit = units[index];

	filesize = `${fileSizeHuman}${unit}`;

	return [filesize, fileSizeBytes];
}

module.exports = calculateSizeFile;