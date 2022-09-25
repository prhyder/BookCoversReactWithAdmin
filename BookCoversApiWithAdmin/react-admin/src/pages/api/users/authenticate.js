const jwt = require('jsonwebtoken');
import getConfig from 'next/config';

import { apiHandler } from '../../../helpers/api/api-handler';

const { serverRuntimeConfig } = getConfig();

const users = require('../../../data/users.json');

const handler = function(req, res) {
	switch (req.method) {
		case 'POST':
			return authenticate();
		default:
			return res.status(405).end(`Method ${req.method} Not Allowed`);
	}

	function authenticate() {
		try {
			const { username, password } = req.body;
			const user = users.filter(u => u.username == username && u.password == password);

			console.log(`user: ${user}`);
			console.log(`users: ${users}`);

			if (user.length == 0 || !user) throw 'Username or password is incorrect.';

			const token = jwt.sign({ sub: user.id }, serverRuntimeConfig.secret, { expiresIn: '7d' });

			return res.status(200).json({
				id: user.id,
				username: user.username,
				firstName: user.firstName,
				lastName: user.lastName,
				token
			});
		}
		
		catch(e) {
			console.error(e);
		}
	}

}

export default apiHandler(handler);