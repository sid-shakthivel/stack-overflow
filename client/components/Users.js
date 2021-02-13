import { useEffect } from 'react';

import { useUsers, useUpdateUsers } from '../contexts/UsersContext';

export default function Users() {
    const users = useUsers();
    const updateUsers = useUpdateUsers();

    useEffect(async () => {
        await updateUsers();
    }, []);

    return (
        <div>
            {users.users.length > 0 ? (
                <div>
                    <h3 style={{ textAlign: 'center' }}>Users</h3>
                    <ul>
                        {users.users.map((user) => (
                            <li key={Math.random()}>{user.username}</li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>No Users</p>
            )}
        </div>
    );
}
