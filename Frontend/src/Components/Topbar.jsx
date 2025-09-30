// Components/Topbar.jsx
import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Topbar({ setToken, setRole, role }) {
  const navigate = useNavigate();
  console.log("rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr", role);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setToken(null);
    setRole(null);
    navigate("/login");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Job Portal
        </Typography>

        {role === "jobseeker" && (
          <>
            <Button
              onClick={() => navigate("/dashboard")}
              sx={{ color: "#ffffff" }}
            >
              Dashboard
            </Button>
            <Button onClick={() => navigate("/jobs")} sx={{ color: "#ffffff" }}>
              Jobs
            </Button>
            <Button
              onClick={() => navigate("/profile")}
              sx={{ color: "#ffffff" }}
            >
              Profile
            </Button>
          </>
        )}

        {role === "employer" && (
          <>
            <Button onClick={() => navigate("/employer-dashboard")}>
              Dashboard
            </Button>
            <Button onClick={() => navigate("/jobs")}>My Jobs</Button>
          </>
        )}

        <Button onClick={handleLogout} sx={{ color: "#ffffff" }}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}
