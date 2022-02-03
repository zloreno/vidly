function asyncMiddleware(handler) {
	return async (req, res, next) => {
		try {
			// function
			await handler(req, res);
		} catch (err) {
			next(err);
		}
	};
}

module.exports = asyncMiddleware;
