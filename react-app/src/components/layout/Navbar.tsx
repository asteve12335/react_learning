import React from "react";

const Navbar: React.FC = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-3">
    <a className="navbar-brand" href="/">CivicLens</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav ms-auto">
        <li className="nav-item">
          <a className="nav-link" href="/dashboard">Dashboard</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/report">Report Issue</a>
        </li>
      </ul>
    </div>
  </nav>
);

export default Navbar;