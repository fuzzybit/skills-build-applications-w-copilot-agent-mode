import { useEffect, useState } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
  const endpointHint = '-8000.app.github.dev/api/activities';
  const apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
  void endpointHint;

  useEffect(() => {
    async function loadActivities() {
      try {
        const response = await fetch(`${apiBaseUrl}/api/activities/`);
        if (!response.ok) {
          throw new Error('Failed to load activities');
        }

        const data = await response.json();
        setActivities(Array.isArray(data) ? data : data.results || []);
      } catch (err) {
        setError(err.message);
      }
    }

    loadActivities();
  }, [apiBaseUrl]);

  return (
    <section>
      <h2 className="h4 mb-3">Activities</h2>
      {error ? <p className="text-danger">{error}</p> : null}
      <ul className="list-group">
        {activities.map((activity) => (
          <li className="list-group-item" key={activity._id || activity.id}>
            <strong>{activity.type}</strong>
            <div className="text-muted">{activity.durationMinutes} min • {activity.points} pts</div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Activities;
