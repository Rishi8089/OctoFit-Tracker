import { useEffect, useState } from 'react';
import { fetchApi } from '../api';

interface Team {
  _id?: string;
  name: string;
  coach: string;
  members: number;
}

function Teams() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApi<Team>('teams')
      .then(setTeams)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="card p-4">
      <h2>Teams</h2>
      {loading && <p>Loading teams...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div>
          <p>{teams.length} teams loaded.</p>
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
                  <tr key={team._id ?? team.name}>
                    <td>{team.name}</td>
                    <td>{team.coach}</td>
                    <td>{team.members}</td>
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

export default Teams;
