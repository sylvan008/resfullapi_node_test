/**
 * Primary file for the API
 */

// dependencies
const http = require('http');

const HOST = 'localhost';
const PORT = 3000;

const server = http.createServer((req, res) => {
	res.end('Hello!\n');
});

server.listen(PORT, HOST, () => {
	console.log(`Server started at ${HOST}:${PORT}`);
});
