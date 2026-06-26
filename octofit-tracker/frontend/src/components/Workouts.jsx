import { useEffect, useState } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
  const apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';

  useEffect(() => {
    async function loadWorkouts() {
      try {
        const response = await fetch(`${apiBaseUrl}/api/workouts/`);
        if (!response.ok) {
          throw new Error('Failed to load workouts');
        }

        const data = await response.json();
        setWorkouts(Array.isArray(data) ? data : data.results || []);
      } catch (err) {
        setError(err.message);
      }
    }

    loadWorkouts();
  }, [apiBaseUrl]);

  return (
    <section>
      <h2 className="h4 mb-3">Workouts</h2>
      {error ? <p className="text-danger">{error}</p> : null}
      <ul className="list-group">
        {workouts.map((workout) => (
          <li className="list-group-item" key={workout._id || workout.id}>
            <strong>{workout.title}</strong>
            <div className="text-muted">{workout.focus} • {workout.durationMinutes} min</div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Workouts;
