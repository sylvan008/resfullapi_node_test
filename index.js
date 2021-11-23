/**
 * Primary file for the API
 */

// dependencies
const http = require('http');
const { URL } = require('url');
const { StringDecoder } = require('string_decoder');

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

	// Get the headers
	const headers = req.headers;

	// Get payloads
	let payload = '';
	const decoder = new StringDecoder('utf-8');
	req.on('data', (data) => {
		payload += decoder.write(data);
	});

	req.on('end', () => {
		payload += decoder.end();
		let body;

		try {
			body = JSON.parse(payload);
		} catch (error) {
			body = error;
		}

		// Send the response
		res.end('Hello!\n');

		// Log the request path
		console.log(`Response:\n`, body);
	});
});

server.listen(PORT, HOST, () => {
	console.log(`Server started at ${HOST}:${PORT}`);
});
