import './App.css'

function App() {
  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm border-0 rounded-4">
            <div className="card-body p-5">
              <p className="text-primary fw-semibold mb-3">Octofit Tracker</p>
              <h1 className="display-5 fw-bold mb-3">Modern fitness tracking for teams</h1>
              <p className="lead text-muted mb-4">
                Track workouts, compete on leaderboards, and keep your squad motivated from one place.
              </p>
              <div className="d-flex gap-3 flex-wrap">
                <a className="btn btn-primary btn-lg" href="#">Get started</a>
                <a className="btn btn-outline-secondary btn-lg" href="#">View dashboard</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
