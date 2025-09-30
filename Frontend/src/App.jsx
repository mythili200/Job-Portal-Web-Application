import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Topbar from "./Components/Topbar";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";
import Jobs from "./Pages/Jobs";
import AdminDashboard from "./Pages/AdminDashboard";
import UserProfile from "./Pages/Profile";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role"));

  return (
    <Router>
      <AppContent
        token={token}
        setToken={setToken}
        setRole={setRole}
        role={role}
      />
    </Router>
  );
}

function AppContent({ token, setToken, setRole, role }) {
  const location = useLocation();
  const hideTopbarRoutes = ["/login", "/register"];
  const showTopbar = token && !hideTopbarRoutes.includes(location.pathname);

  return (
    <>
      {showTopbar && (
        <Topbar setToken={setToken} setRole={setRole} role={role} />
      )}

      <Routes>
        <Route
          path="/login"
          element={<Login setToken={setToken} setRole={setRole} role={role} />}
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={token ? <Dashboard /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/admin-dashboard"
          element={
            token ? <AdminDashboard /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/jobs"
          element={token ? <Jobs /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/profile"
          element={token ? <UserProfile /> : <Navigate to="/login" replace />}
        />
        <Route
          path="*"
          element={<Navigate to={token ? "/dashboard" : "/login"} replace />}
        />
      </Routes>
    </>
  );
}

export default App;
