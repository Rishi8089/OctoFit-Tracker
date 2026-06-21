import { useEffect, useState } from 'react';
import { fetchApi } from '../api';

interface User {
  _id?: string;
  name: string;
  email: string;
  role: string;
  team: string;
}

function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApi<User>('users')
      .then(setUsers)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="card p-4">
      <h2>Users</h2>
      {loading && <p>Loading users...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div>
          <p>{users.length} users loaded.</p>
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Team</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id ?? `${user.email}-${user.name}`}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>{user.team}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default Users;
