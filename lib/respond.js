// require node modules
const url = require('url');
const path = require('path');
const fs = require('fs');

// file imports
const buildBreadCrumb = require('./breadcrumb.js');
const buildMainContent = require('./mainContent.js');

// static base path: location of static folder
const staticBasePath = path.join(__dirname, '..', 'static');

console.log(path.join(__dirname, '..', 'static'));

// respond to a request
// Following is function passed to createServer used to create the server

const respond = (request, response) => {

	// response.write('response fired!');
	// response.end();

	// before working with the path name, need to decode it
	// second argument is to check for queries, default is false
	let pathname = url.parse(request.url, true).pathname;

	if(pathname === '/favicon.ico') {
		console.log('pathname is favicon');
		return false;
	}

	// console.log(pathname);

	pathname = decodeURIComponent(pathname);

	// get the cooresponding full static path located in the static folder
	const fullStaticPath = path.join(staticBasePath, pathname);

	// console.log(path.join(staticBasePath, pathname));

	// can we find something in the full static path?

		// no: send a '404 file not found'
		if(!fs.existsSync(fullStaticPath)){
			console.log(`${fullStaticPath} does not exist.`);
			response.write('404: File not found!');
			response.end();
			// need code to stop exicuting
			return false;
		}

		// We found something
		// is it a file or directory
		let stats;
		try{
			stats = fs.lstatSync(fullStaticPath);
		} catch(error){
			console.log(error);
		}

		// It is a directory:
		if(stats.isDirectory()){


			// Get the content from the template index.html
			let data = fs.readFileSync(path.join(staticBasePath, 'project_files/index.html'), 'utf-8');

			// build the page title
			console.log(pathname);
			let pathElements = pathname.split('/').reverse();
			pathElements = pathElements.filter(element => element !== '');
			const folderName = pathElements[0];
			console.log(folderName);

			// build bread crumb
			const breadcrumb = buildBreadCrumb(pathname);

			// build table rows (main_content)
			const mainContent = buildMainContent(fullStaticPath, pathname);

			// fill the template data with: the page title, breadcrumb, and table rows (main_content) 
			data = data.replace('page_title', folderName);
			data = data.replace('pathname', breadcrumb);
			data = data.replace('mainContent', mainContent);

			// print data to webpage
			response.statusCode = 200;
			response.write(data);
			return response.end();
		}
		// It is not a director nor file
			// send '401 acess denied!'
		if(!stats.isFile()) {
			response.statusCode = 401;
			response.write('401: Access denied!');
			console.log('not a file!');
			return response.end();
		}

		// It is a file
			// Lets get the file extension
			// get the file mime type and add it to the response header
			// get the file size and add it to the response header
			// pdf file? -> display in browser
			// audio/video file? -> stream in ranges
			// all other files stream in a normal way


}

module.exports = respond;