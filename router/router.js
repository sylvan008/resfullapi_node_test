const handlers = require('./handlers');

/**
 * Define a request router
 */
const router = {
	sample: handlers.sampleHandler,
	notFound: handlers.notFoundHandler,
};

module.exports = router;
