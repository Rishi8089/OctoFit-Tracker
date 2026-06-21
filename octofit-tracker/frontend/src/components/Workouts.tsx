import { useEffect, useState } from 'react';
import { fetchApi } from '../api';

interface Workout {
  _id?: string;
  name: string;
  focus: string;
  durationMinutes: number;
  difficulty: string;
  caloriesTarget: number;
}

function Workouts() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApi<Workout>('workouts')
      .then(setWorkouts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="card p-4">
      <h2>Workouts</h2>
      {loading && <p>Loading workouts...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div>
          <p>{workouts.length} workouts loaded.</p>
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
                  <tr key={workout._id ?? workout.name}>
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
        </div>
      )}
    </div>
  );
}

export default Workouts;
