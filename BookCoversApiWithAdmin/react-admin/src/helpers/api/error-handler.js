function errorHandler(err, res) {
	if (typeof (err) === 'string') {
		// Custom app error
		return res.status(400).json({ message: err });
	}

	if (err.name === 'UnauthorizedError') {
		// JWT authentication error
		return res.status(401).json({ message: 'Invalid token' });
	}

	// Default to 500 server error
	return res.status(500).json({ message: err.message });
}

export { errorHandler };