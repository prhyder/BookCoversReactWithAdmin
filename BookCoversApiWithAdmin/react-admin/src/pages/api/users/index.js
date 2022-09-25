import { apiHandler } from '../../../helpers/api/api-handler';

const users = require('../../../data/users.json');

function handler(req, res) {
	switch (req.method) {
		case 'GET':
			return getUsers();
		default:
			return res.status(405).end(`Method ${req.method} Not Allowed`);
	}

	function getUsers() {
		const response = users.map(user => {
			// Return users without password
			const { password, ...userWithoutPassword } = user;
			return userWithoutPassword;
		});
		return res.status(200).json(resonse);
	}
}