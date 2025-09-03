import React from "react";

const Sidebar: React.FC = () => (
  <div className="d-flex flex-column p-3 h-100">
    <h5 className="mb-4">Menu</h5>
    <ul className="nav nav-pills flex-column">
      <li className="nav-item mb-2">
        <a className="nav-link" href="/dashboard">Dashboard</a>
      </li>
      <li className="nav-item mb-2">
        <a className="nav-link" href="/report">Report Issue</a>
      </li>
      <li className="nav-item mb-2">
        <a className="nav-link" href="/settings">Settings</a>
      </li>
    </ul>
  </div>
);

export default Sidebar;