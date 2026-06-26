import { useEffect, useState } from 'react';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState('');
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
  const apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        const response = await fetch(`${apiBaseUrl}/api/leaderboard/`);
        if (!response.ok) {
          throw new Error('Failed to load leaderboard');
        }

        const data = await response.json();
        setEntries(Array.isArray(data) ? data : data.results || []);
      } catch (err) {
        setError(err.message);
      }
    }

    loadLeaderboard();
  }, [apiBaseUrl]);

  return (
    <section>
      <h2 className="h4 mb-3">Leaderboard</h2>
      {error ? <p className="text-danger">{error}</p> : null}
      <ul className="list-group">
        {entries.map((entry, index) => (
          <li className="list-group-item" key={entry._id || entry.userId || index}>
            <strong>#{index + 1}</strong> • {entry.userId} • {entry.points} pts
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Leaderboard;
