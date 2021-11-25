const StatusCodes = {
	OK: 200,
	NotFound: 404,
};

const RequestEvents = {
	DATA: 'data',
	END: 'end',
};

const TypeStrings = {
	NUMBER: 'number',
	OBJECT: 'object',
	UNDEFINED: 'undefined',
};

module.exports = {
	RequestEvents,
	StatusCodes,
	TypeStrings,
};
