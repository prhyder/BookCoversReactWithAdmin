import { errorHandler } from './error-handler';
import { jwtMiddleware } from './jwt-middleware';

function apiHandler(handler) {
	return async (req, res) => {
		try {
			// Global middleware
			await jwtMiddleware(req, res);

			// Route handler
			await handler(req, res);
		}
		catch (err) {
			// Global error handler
			errorHandler(err, res);
		}
	}
}

export { apiHandler };