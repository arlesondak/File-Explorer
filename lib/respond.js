// require node modules

// file imports

// static base path: location of static folder

// respond to a request
// Following is function passed to createServer used to create the server

const respond = (request, response) => {

	// before working with the path name, need to decode it

	// get the cooresponding full static path located in the static folder

	// can we find something in the full static path?

		// no: send a '404 file not found'

		// We found something
		// is it a file or directory

			// It is a directory:
				// Get the content from the template index.html
				// build the page title
				// build bread crumb
				// build table rows (main_content)
				// fill the template data with: the page title, breadcrumb, and table rows (main_content) 
				// print data to webpage

			// It is not a director nor file
				// send '401 acess denied!'

			// It is a file
				// Lets get the file extension
				// get the file mime type and add it to the response header
				// get the file size and add it to the response header
				// pdf file? -> display in browser
				// audio/video file? -> stream in ranges
				// all other files stream in a normal way


}

