import { useState, useEffect } from 'react';
import { userService } from '../../services/user.service';
import Spinner from '../../components/Spinner';

export default function Users() {
	const [users, setUsers] = useState(null);

	useEffect(() => {
		userService.getAll().then(x => x.setUsers(x));
	}, []);

	return (
		<div className="card mt-4">
            <h4 className="card-header">Users</h4>
            <div className="card-body">
                <h6>Users from secure api end point</h6>
                {users &&
                    <ul>
                        {users.map(user =>
                            <li key={user.id}>{user.firstName} {user.lastName}</li>
                        )}
                    </ul>
                }
                {!users && <Spinner />}
            </div>
        </div>
	);
}