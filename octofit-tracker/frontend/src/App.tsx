import { BrowserRouter, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/users', label: 'Users' },
    { path: '/teams', label: 'Teams' },
    { path: '/activities', label: 'Activities' },
    { path: '/leaderboard', label: 'Leaderboard' },
    { path: '/workouts', label: 'Workouts' },
  ];

  return (
    <BrowserRouter>
      <div className="container py-4">
        <header className="mb-4">
          <h1>OctoFit Tracker</h1>
          <p className="text-muted">
            React 19 presentation tier with Codespaces-aware API routing.
          </p>
          <div className="alert alert-info">
            <strong>Note:</strong> Define <code>VITE_CODESPACE_NAME</code> in{' '}
            <code>.env.local</code> for Codespaces-hosted API URLs. Without it,
            the app falls back to <code>http://localhost:8000</code>.
          </div>
          <nav className="nav nav-pills flex-column flex-sm-row gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `nav-link${isActive ? ' active' : ''}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </header>

        <Routes>
          <Route
            path="/"
            element={
              <div className="card p-4">
                <h2>Welcome to OctoFit Tracker</h2>
                <p>
                  Use the links above to explore the app. Each page fetches data
                  from the backend API using <code>import.meta.env.VITE_CODESPACE_NAME</code>.
                </p>
              </div>
            }
          />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
