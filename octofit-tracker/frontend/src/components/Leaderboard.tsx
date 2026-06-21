import { useEffect, useState } from 'react';
import { fetchApi } from '../api';

interface LeaderboardEntry {
  _id?: string;
  name: string;
  category: string;
  score: number;
  rank: number;
}

function Leaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApi<LeaderboardEntry>('leaderboard')
      .then(setEntries)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="card p-4">
      <h2>Leaderboard</h2>
      {loading && <p>Loading leaderboard...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div>
          <p>{entries.length} leaderboard entries loaded.</p>
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry) => (
                  <tr key={entry._id ?? `${entry.name}-${entry.rank}`}>
                    <td>{entry.rank}</td>
                    <td>{entry.name}</td>
                    <td>{entry.category}</td>
                    <td>{entry.score}</td>
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

export default Leaderboard;
