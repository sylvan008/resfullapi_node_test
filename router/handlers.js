const { StatusCodes } = require('../utils/const');

/**
 * Sample handler
 * @param {*} data
 * @param {function} callback
 */
function sampleHandler(data, callback) {
	// callback a http status code, and a payload object
	callback(StatusCodes.OK, data);
}

/**
 * Not found handler
 * @param {*} data
 * @param {function} callback
 */
function notFoundHandler(_data, callback) {
	callback(StatusCodes.NotFound);
}

const handlers = {
	notFoundHandler,
	sampleHandler,
};

module.exports = handlers;
