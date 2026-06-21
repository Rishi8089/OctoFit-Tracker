import { useEffect, useState } from 'react';
import { fetchApi } from '../api';

const endpoint = 'workouts';
const exampleUrl = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts`
  : 'http://localhost:8000/api/workouts';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApi(endpoint)
      .then(setWorkouts)
      .catch((err) => setError(err.message || 'Failed to load workouts'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="card p-4">
      <h2>Workouts</h2>
      <p className="text-muted">API endpoint: {exampleUrl}</p>
      {loading && <p>Loading workouts...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Focus</th>
                <th>Duration</th>
                <th>Difficulty</th>
                <th>Calories Target</th>
              </tr>
            </thead>
            <tbody>
              {workouts.map((workout) => (
                <tr key={workout._id ?? `${workout.name}-${workout.difficulty}`}>
                  <td>{workout.name}</td>
                  <td>{workout.focus}</td>
                  <td>{workout.durationMinutes} min</td>
                  <td>{workout.difficulty}</td>
                  <td>{workout.caloriesTarget}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Workouts;
