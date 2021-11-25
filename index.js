/**
 * Primary file for the API
 */

// dependencies
const http = require('http');
const { URL } = require('url');
const { StringDecoder } = require('string_decoder');
const { TypeStrings, RequestEvents, StatusCodes } = require('./utils/const');
const router = require('./router/router');

const HOST = 'localhost';
const PORT = 3000;
const ENCODING = 'utf-8';

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
	const decoder = new StringDecoder(ENCODING);

	req.on(RequestEvents.DATA, (data) => {
		payload += decoder.write(data);
	});

	req.on(RequestEvents.END, () => {
		payload += decoder.end();
		let body;

		try {
			body = JSON.parse(payload);
		} catch (error) {
			body = error;
		}

		// Choose the handler this request should go to.
		// If one is not found, use the notFound handler.
		const chosenHandler = typeof(router[trimmedPath]) !== TypeStrings.UNDEFINED
			? router[trimmedPath]
			: router.notFound;

		// Construct the data object to send to the handlers
		const data = {
			method,
			headers,
			body,
			query: searchParams.toString(),
			path: trimmedPath,
		};

		// Route the request to the handler specified in the router
		chosenHandler(data, (statusCode, payload) => {
			// Use the status code called back by the handler, or default to 200
			statusCode = typeof(statusCode) === TypeStrings.NUMBER ? statusCode : StatusCodes.OK;

			// use the payload called back by the handler or default to an empty object
			payload = typeof(payload) === TypeStrings.OBJECT ? payload : {};

			let payloadString = '';

			// Convert payload to a string
			try {
				payloadString = JSON.stringify(payload);
			} catch (e) {
				payloadString = e;
			}

			// Return the response
			res.writeHead(statusCode);
			res.end(payloadString);

			// Log the request path
			console.log(`Returning this response:\n`, statusCode, payloadString, '\n');
		});
	});
});

server.listen(PORT, HOST, () => {
	console.log(`Server started at ${HOST}:${PORT}`);
});
