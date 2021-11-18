/**
 * Primary file for the API
 */

// dependencies
const http = require('http');
const { URL } = require('url');

const HOST = 'localhost';
const PORT = 3000;

const server = http.createServer((req, res) => {
	// Get the url
	const baseUrl = `http://${req.headers.host}/`;
	const reqUrl = new URL(req.url, baseUrl);

	// Get the path
	const path = reqUrl.pathname;
	const trimmedPath = path.replace(/^\/|\/$/g, '');

	// Get the query
	const searchParams = new URLSearchParams(reqUrl.searchParams);

	// Get the method
	const method = req.method.toLowerCase();

	// Send the response
	res.end('Hello!\n');

	// Log the request path
	console.log(`Request received on path: ${trimmedPath} with method ${method} and query parameters: ${searchParams}`);
});

server.listen(PORT, HOST, () => {
	console.log(`Server started at ${HOST}:${PORT}`);
});
