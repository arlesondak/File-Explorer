//You will build this project using pure Node to gain a thorough understanding of Node. There are obviously easier ways of building this project using external modules, but that is the purpose of this project as you would miss out on many code concepts.

// require node modules
const http = require('http');

// file imports
const respond = require('./lib/respond.js');

// connection settings
// if port not found in process.env, then use 3000
const port = process.env.port || 3000;

// create server
const server = http.createServer(respond);

// listen to client requests on the specific port, the port should be available
server.listen(port, () => {
	console.log(`listening on port: ${port}`);
});
