const apiUrl = process.env.NODE_ENV === 'development'
	? 'https://localhost:5001/api' // Development API
	: 'https://localhost:5001/api'; // Production API

export {
	apiUrl
};