import { NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';

function App() {
  return (
    <main className="container py-4">
      <div className="card shadow-sm border-0 rounded-4">
        <div className="card-body p-4">
          <h1 className="display-6 fw-bold mb-3">Octofit Tracker</h1>
          <p className="text-muted mb-4">
            Multi-tier fitness tracking for teams and activities. Define <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> for Codespaces URLs.
          </p>

          <nav className="nav nav-pills flex-wrap mb-4">
            <NavLink className="nav-link" to="/">Home</NavLink>
            <NavLink className="nav-link" to="/users">Users</NavLink>
            <NavLink className="nav-link" to="/teams">Teams</NavLink>
            <NavLink className="nav-link" to="/activities">Activities</NavLink>
            <NavLink className="nav-link" to="/leaderboard">Leaderboard</NavLink>
            <NavLink className="nav-link" to="/workouts">Workouts</NavLink>
          </nav>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </div>
      </div>
    </main>
  );
}

function Home() {
  return (
    <div className="row g-3">
      <div className="col-md-6">
        <div className="p-3 border rounded-3">
          <h2 className="h5">Live data</h2>
          <p className="text-muted mb-0">Browse users, teams, activities, leaderboard entries, and workout plans from the backend.</p>
        </div>
      </div>
      <div className="col-md-6">
        <div className="p-3 border rounded-3">
          <h2 className="h5">Environment-aware API</h2>
          <p className="text-muted mb-0">The frontend uses Codespaces URLs when available and falls back to localhost otherwise.</p>
        </div>
      </div>
    </div>
  );
}

export default App;
