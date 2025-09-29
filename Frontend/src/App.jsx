// App.jsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Topbar from "./Components/Topbar";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";
import Jobs from "./Pages/Jobs";
import AdminDashboard from "./Pages/AdminDashboard";
import UserProfile from "./Pages/Profile";

function App() {
  const token = localStorage.getItem("token");

  return (
    <Router>
      {token && <Topbar />}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={token ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />

        <Route
          path="/jobs"
          element={token ? <Jobs /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile"
          element={token ? <UserProfile /> : <Navigate to="/login" />}
        />
        <Route
          path="*"
          element={<Navigate to={token ? "/dashboard" : "/login"} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
