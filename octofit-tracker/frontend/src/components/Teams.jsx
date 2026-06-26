import { useEffect, useState } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
  const apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';

  useEffect(() => {
    async function loadTeams() {
      try {
        const response = await fetch(`${apiBaseUrl}/api/teams/`);
        if (!response.ok) {
          throw new Error('Failed to load teams');
        }

        const data = await response.json();
        setTeams(Array.isArray(data) ? data : data.results || []);
      } catch (err) {
        setError(err.message);
      }
    }

    loadTeams();
  }, [apiBaseUrl]);

  return (
    <section>
      <h2 className="h4 mb-3">Teams</h2>
      {error ? <p className="text-danger">{error}</p> : null}
      <ul className="list-group">
        {teams.map((team) => (
          <li className="list-group-item" key={team._id || team.id}>
            <strong>{team.name}</strong>
            <div className="text-muted">Captain: {team.captain}</div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Teams;
