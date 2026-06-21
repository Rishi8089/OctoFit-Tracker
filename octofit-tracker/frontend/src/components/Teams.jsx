import { useEffect, useState } from 'react';
import { fetchApi } from '../api';

const endpoint = 'teams';
const exampleUrl = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams`
  : 'http://localhost:8000/api/teams';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApi(endpoint)
      .then(setTeams)
      .catch((err) => setError(err.message || 'Failed to load teams'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="card p-4">
      <h2>Teams</h2>
      <p className="text-muted">API endpoint: {exampleUrl}</p>
      {loading && <p>Loading teams...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Team</th>
                <th>Coach</th>
                <th>Members</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team) => (
                <tr key={team._id ?? `${team.name}-${team.coach}`}>
                  <td>{team.name}</td>
                  <td>{team.coach}</td>
                  <td>{team.members}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Teams;
