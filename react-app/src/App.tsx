import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import ReportIssue from "./pages/ReportIssue";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="container-fluid min-vh-100 d-flex flex-column p-0">
      <Navbar />
      <div className="row flex-grow-1 m-0">
        <div className="col-12 col-md-3 col-lg-2 bg-light p-0 border-end">
          <Sidebar />
        </div>
        <main className="col p-4">
          <Routes>
            <Route path="/" element={
              <>
                <h2 className="display-5 mb-3">Welcome to CivicLens</h2>
                <p className="lead">
                  Start by checking the dashboard or reporting an issue.
                </p>
              </>
            } />
            <Route path="/report" element={<ReportIssue />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;