import { useEffect, useState } from 'react';
import { fetchApi } from '../api';

interface Activity {
  _id?: string;
  user: string;
  team: string;
  type: string;
  durationMinutes: number;
  caloriesBurned: number;
  date: string;
}

function Activities() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApi<Activity>('activities')
      .then(setActivities)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="card p-4">
      <h2>Activities</h2>
      {loading && <p>Loading activities...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div>
          <p>{activities.length} activities loaded.</p>
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Team</th>
                  <th>Type</th>
                  <th>Duration</th>
                  <th>Calories</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((activity) => (
                  <tr key={activity._id ?? `${activity.user}-${activity.date}`}>
                    <td>{activity.user}</td>
                    <td>{activity.team}</td>
                    <td>{activity.type}</td>
                    <td>{activity.durationMinutes} min</td>
                    <td>{activity.caloriesBurned}</td>
                    <td>{new Date(activity.date).toLocaleString()}</td>
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

export default Activities;
